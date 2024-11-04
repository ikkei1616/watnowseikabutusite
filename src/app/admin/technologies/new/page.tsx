"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "./technologiesFormSchema";
import { useFormFields } from "./hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingModal from '@/components/loading/LoadingModal';

const NewServicesPage = () => {
  const { control, handleSubmit } = useForm<ServiceInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<ServiceOutputSchema> = async (data) => {
    setIsLoading(true);

    let imageUrl = '';

    if (data.iconImage instanceof File) {
      const imageFileName = encodeURIComponent(`${Date.now()}-${data.iconImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const { error: uploadError } = await supabase.storage
        .from('technology_icons')
        .upload(imageFileName, data.iconImage);

      if (uploadError) {
        console.error('Error uploading file: ', uploadError.message);
        window.alert(uploadError.message);
        setIsLoading(false);
        return;
      }

      const { data: publicImageUrlData } = await supabase.storage
        .from('technology_icons')
        .getPublicUrl(imageFileName);

      imageUrl = publicImageUrlData.publicUrl || '';
    }

    const { iconImage, ...rest } = data;
    const submitData = { ...rest, image: imageUrl };

    const { error: insertError } = await supabase
      .from('technologies')
      .insert([submitData])
      .select();

    if (insertError) {
      console.error('Error inserting service:', insertError);
      window.alert(insertError.message);
      setIsLoading(false);
      return;
    }

    window.location.href = '/admin/technologies/existing-technologies';
  };

  const formFields = useFormFields(control);

  return (
    <>
    <LoadingModal isOpen={isLoading} />
      <main style={{
        width: "90%",
        margin: "0 auto",
      }
      }>
        <AdminHeader isEditing/>
        <h1 style={{
          borderBottom: "1px solid #9CABC7",
          paddingBottom: "12px",
          marginBottom: "12px",
        }}>新規技術スタック作成</h1>
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
            <FormButton name="キャンセル" type='cancel' onClick={() => window.location.href = '/admin/technologies'}/>
            <FormButton name="新規作成" type='submit' />
          </div>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;
