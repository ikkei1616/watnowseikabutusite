"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "./serviceFormSchema";
import { useFormFields } from "./hooks";
import { FormFactory } from "@/components/FormFactory";
import FormButton from '@/components/FormButton';
import { supabase } from '../../../../supabase/supabase';

const NewServicesPage = () => {
  const { control, handleSubmit } = useForm<ServiceInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });

  const [isRoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<ServiceOutputSchema> = async (data) => {
    setIsLoading(true);

    let imageUrl = '';
    let videoUrl = '';

    if (data.thumbnailImage instanceof File) {
      const imageFileName = encodeURIComponent(`${Date.now()}-${data.thumbnailImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const { error: uploadError } = await supabase.storage
        .from('service_images')
        .upload(imageFileName, data.thumbnailImage);

      if (uploadError) {
        console.error('Error uploading file: ', uploadError.message);
        return;
      }

      const { data: publicImageUrlData } = await supabase.storage
        .from('service_images')
        .getPublicUrl(imageFileName);

      imageUrl = publicImageUrlData.publicUrl || '';
    }

    if (data.demoVideo instanceof File) {
      const videoFileName = encodeURIComponent(`${Date.now()}-${data.demoVideo.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const { error: uploadError } = await supabase.storage
        .from('service_videos')
        .upload(videoFileName, data.demoVideo);

      if (uploadError) {
        console.error('Error uploading file: ', uploadError.message);
        return;
      }

      const { data: publicVideoUrlData } = await supabase.storage
        .from('service_videos')
        .getPublicUrl(videoFileName);

      videoUrl = publicVideoUrlData.publicUrl || '';
    }

    const { thumbnailImage, demoVideo, eventYear, teamMembers, technologiesId, ...rest } = data;
    const submitData = { ...rest, image: imageUrl, video: videoUrl };

    const { data: serviceData, error: insertError } = await supabase
      .from('services')
      .insert([submitData])
      .select();

    if (insertError) {
      console.error('Error inserting service:', insertError);
      return;
    }

    if (data.teamMembers && data.teamMembers.length > 0) {
      const { error: teamMembersError } = await supabase
        .from('users_servicies')
        .insert(data.teamMembers.map((teamMember) => ({
          service_id: serviceData[0].id,
          user_id: teamMember,
        })))
        .select();

      if (teamMembersError) {
        console.error('Error inserting team members:', teamMembersError);
        return;
      }
    }

    if (data.technologiesId && data.technologiesId.length > 0) {
      const { error: technologiesError } = await supabase
        .from('services_technologies')
        .insert(data.technologiesId.map((technologyId) => ({
          service_id: serviceData[0].id,
          technology_id: technologyId,
        })))
        .select();

      if (technologiesError) {
        console.error('Error inserting technologies:', technologiesError);
        return;
      }
    }

    window.location.href = '/services';
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
        <h1 style={{
          borderBottom: "1px solid #9CABC7",
          paddingBottom: "12px",
          marginBottom: "12px",
        }}>新規サービスページ作成</h1>
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
            <FormButton name="キャンセル" type='cancel' />
            <FormButton name="新規作成" type='submit' />
          </div>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;