"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserInputSchema, UserOutputSchema, resolver } from "./userFormSchema";
import { createFormFields, FormField } from "./hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingModal from '@/components/loading/LoadingModal';
import { useEffect, useState } from "react";

const NewUsersPage = () => {
  const { control, handleSubmit } = useForm<UserInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });
  const [formFields, setFormFields] = useState<{ container: string, title: string, fields: FormField<UserInputSchema>[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);

  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: techsData, error: techsError } = await supabase
          .from('technologies')
          .select('id, name')

        if (techsError) {
          throw new Error(`Error fetching techs: ${techsError.message}`);
        }

        setFormFields(createFormFields(control, techsData.map((tech) => ({ value: tech.id, label: tech.name })) || []));
        setIsFirstLoading(false);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCancel = () => {
    const confirmDelete = window.confirm("入力内容が破棄されますがよろしいですか？");

    if (!confirmDelete) {
      return;
    }
    router.push('/admin/users');
  }

  const onSubmit: SubmitHandler<UserOutputSchema> = async (data) => {
    setIsLoading(true);

    let imageUrl = '';

    if (data.iconImage instanceof File) {
      const imageFileName = encodeURIComponent(`${Date.now()}-${data.iconImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const { error: uploadError } = await supabase.storage
        .from('user_icons')
        .upload(imageFileName, data.iconImage);

      if (uploadError) {
        console.error('Error uploading file: ', uploadError.message);
        window.alert(uploadError.message);
        setIsLoading(false);
        return;
      }

      const { data: publicImageUrlData } = await supabase.storage
        .from('user_icons')
        .getPublicUrl(imageFileName);

      imageUrl = publicImageUrlData.publicUrl || '';
    }

    const { iconImage, technologiesId, x_id, instagram_id, github_id, ...rest } = data;
    const submitData = { ...rest, image: imageUrl };

    const { data: userData, error: insertError } = await supabase
      .from('users')
      .insert([submitData])
      .select();

    if (insertError) {
      console.error('Error inserting User:', insertError);
      window.alert(insertError.message);
      setIsLoading(false);
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
        window.alert(technologiesError.message);
        setIsLoading(false);
        return;
      }
    }


    if (x_id) {
      const { error: xIdError } = await supabase
        .from('x')
        .insert([{ user_id: userData[0].id, x_id: x_id }]);

      if (xIdError) {
        console.error('Error inserting url_web:', xIdError);
        window.alert(xIdError.message);
        setIsLoading(false);
        return;
      }
    }

    if (instagram_id) {
      const { error: instagramIdError } = await supabase
        .from('instagram')
        .insert([{ user_id: userData[0].id, instagram_id: instagram_id }]);

      if (instagramIdError) {
        console.error('Error inserting url_web:', instagramIdError);
        window.alert(instagramIdError.message);
        setIsLoading(false);
        return;
      }
    }

    if (github_id) {
      const { error: githubIdError } = await supabase
        .from('github')
        .insert([{ user_id: userData[0].id, github_id: github_id }]);

      if (githubIdError) {
        console.error('Error inserting url_web:', githubIdError);
        window.alert(githubIdError.message);
        setIsLoading(false);
        return;
      }
    }
    router.push('/admin/users/existing-users');
  };

  return (
    <>
      <LoadingModal isOpen={isLoading} />
      <main style={{
        width: "90%",
        margin: "0 auto",
      }
      }>
        <AdminHeader isEditing />
        {!isFirstLoading && <div>
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
                  <FormFactory<UserInputSchema> key={field.id} {...field} />
                ))}
              </section>
            ))}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '60px',
              margin: "20px 0"
            }}>
              <FormButton name="キャンセル" type='cancel' onClick={handleCancel} />
              <FormButton name="新規作成" type='submit' />
            </div>
          </form>
        </div>}
      </main>
    </>
  );
};

export default NewUsersPage;
