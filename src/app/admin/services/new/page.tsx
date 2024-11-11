"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "./serviceFormSchema";
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

    const { thumbnailImage, demoVideo, eventYear, teamMembers, url_web, url_appstore, url_googleplay, url_others, technologiesId, ...rest } = data;
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
        })));

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
        })));

      if (technologiesError) {
        console.error('Error inserting technologies:', technologiesError);
        return;
      }
    }

    if(data.url_web){
      const { error: urlWebError } = await supabase
        .from('url_website')
        .insert([{service_id: serviceData[0].id, url: data.url_web}]);

      if (urlWebError) {
        console.error('Error inserting url_web:', urlWebError);
        return;
      }
    }

    if(data.url_appstore){
      const { error: urlAppleStoreError } = await supabase
        .from('url_app_store')
        .insert([{service_id: serviceData[0].id, url: data.url_appstore}]);

      if (urlAppleStoreError) {
        console.error('Error inserting url_web:', urlAppleStoreError);
        return;
      }
    }

    if(data.url_googleplay){
      const { error: urlGooglePlayError } = await supabase
        .from('url_google_play')
        .insert([{service_id: serviceData[0].id, url: data.url_googleplay}]);

      if (urlGooglePlayError) {
        console.error('Error inserting url_web:', urlGooglePlayError);
        return;
      }
    }

    if(data.url_others){
      const { error: urlOthersError } = await supabase
        .from('url_others')
        .insert([{service_id: serviceData[0].id, url: data.url_others}]);

      if (urlOthersError) {
        console.error('Error inserting url_web:', urlOthersError);
        return;
      }
    }

    window.location.href = '/admin/services/existing-services';
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
          borderBottom: "1px solid var(--border)",
          paddingBottom: "12px",
          marginBottom: "12px",
        }}>新規サービスページ作成</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map(({ title, fields }, index) => (
            <section key={index} style={{
              borderBottom: "1px solid var(--border)",
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
