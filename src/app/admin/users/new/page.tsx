"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "./userFormSchema";
import { useFormFields } from "./hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import AdminHeader from '@/components/admin/AdminHeader';

const NewServicesPage = () => {
  const { control, handleSubmit } = useForm<ServiceInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });

  const [isRoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<ServiceOutputSchema> = async (data) => {
    setIsLoading(true);

    let imageUrl = '';

    if (data.iconImage instanceof File) {
      const imageFileName = encodeURIComponent(`${Date.now()}-${data.iconImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const { error: uploadError } = await supabase.storage
        .from('service_images')
        .upload(imageFileName, data.iconImage);

      if (uploadError) {
        console.error('Error uploading file: ', uploadError.message);
        return;
      }

      const { data: publicImageUrlData } = await supabase.storage
        .from('service_images')
        .getPublicUrl(imageFileName);

      imageUrl = publicImageUrlData.publicUrl || '';
    }

    const {iconImage, technologiesId, ...rest } = data;
    const submitData = { ...rest, image: imageUrl };

    const { data: userData, error: insertError } = await supabase
      .from('users')
      .insert([submitData])
      .select();

    if (insertError) {
      console.error('Error inserting service:', insertError);
      return;
    }

    if (data.technologiesId && data.technologiesId.length > 0) {
      const { error: technologiesError } = await supabase
        .from('users_technologies')
        .insert(data.technologiesId.map((technologyId) => ({
          user_id: userData[0].id,
          technology_id: technologyId,
        })));

      if (technologiesError) {
        console.error('Error inserting technologies:', technologiesError);
        return;
      }
    }

    // window.location.href = '/admin/users/existing-users';
  };

  const formFields = useFormFields(control);

  if (isRoading) {
    return <div>ローディング中...</div>;
  }

  return (
    <>
      <main style={{
        width: "90%",
        margin: "0 auto",
      }
      }>
        <AdminHeader />
        <h1 style={{
          borderBottom: "1px solid #9CABC7",
          paddingBottom: "12px",
          marginBottom: "12px",
        }}>新規ユーザ作成</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map(({ title, fields }, index) => (
            <section key={index} style={{
              borderBottom: "1px solid #9CABC7",
              paddingBottom: "12px",
              marginBottom: "12px",
            }}>
              <h3>{title}</h3>
              {fields.map((field) => (
                <FormFactory<ServiceInputSchema> key={field.id} {...field} />
              ))}
            </section>
          ))}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            margin: "20px 0"
          }}>
            <FormButton name="キャンセル" type='cancel' onClick={() => window.location.href = '/admin/services'}/>
            <FormButton name="新規作成" type='submit' />
          </div>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;
