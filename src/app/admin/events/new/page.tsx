"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { EventInputSchema, EventOutputSchema, resolver } from "./eventFormSchema";
import { useFormFields } from "./hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';
import LoadingModal from '@/components/loading/LoadingModal';
import AdminHeader from '@/components/admin/AdminHeader';
import { date } from 'zod';

const NewEventPage = () => {
  const { control, handleSubmit } = useForm<EventInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<EventOutputSchema> = async (data) => {
    console.log(data);
    setIsLoading(true);

    let imageUrl = '';

    // サムネイル画像の処理
    if (data.thumbnailImage instanceof File) {
      const imageFileName = encodeURIComponent(`${Date.now()}-${data.thumbnailImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const { error: uploadError } = await supabase.storage
        .from('event_images')
        .upload(imageFileName, data.thumbnailImage);

      if (uploadError) {
        console.error('Error uploading file: ', uploadError.message);
        window.alert(uploadError.message);
        setIsLoading(false);
        return;
      }

      const { data: publicImageUrlData } = await supabase.storage
        .from('event_images')
        .getPublicUrl(imageFileName);

      imageUrl = publicImageUrlData.publicUrl || '';
    }

    // フォームデータの処理
    const { thumbnailImage, awards, release_year, release_month, ...rest } = data;

    const submitData = { ...rest, image: imageUrl, year: release_year, month: release_month };

    const { data: eventData, error: insertError } = await supabase
      .from('events')
      .insert([submitData])
      .select();

    if (insertError) {
      console.error('Error inserting event:', insertError);
      window.alert(insertError.message);
      setIsLoading(false);
      return;
    }

    if (data.awards?.length !== 0 && data.awards !== undefined) {
      const awardsToInsert = data.awards.map((award) => {
        if (award.name !== '' && award.order_num !== 0) {
          return {
            ...award,
            event_id: eventData[0].id,
          };
        }
      });

      if (awardsToInsert.length !== 0) {
        const { error: insertError } = await supabase
          .from('awards')
          .insert(awardsToInsert)
          .select();

        if (insertError) {
          console.error('Error inserting award:', insertError);
          window.alert(insertError.message);
          setIsLoading(false);
          return;
        }
      }
    }

    window.location.href = '/admin/events/existing-events';
  };

  const formFields = useFormFields(control);

  return (
    <>
      <LoadingModal isOpen={isLoading} />
      <main style={{
        width: "90%",
        margin: "0 auto",
      }}>
        <AdminHeader isEditing />
        <h1 style={{
          borderBottom: "1px solid #9CABC7",
          paddingBottom: "12px",
          marginBottom: "12px",
        }}>新規イベントページ作成</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map(({ title, fields }, index) => (
            <section key={index} style={{
              borderBottom: "1px solid #9CABC7",
              paddingBottom: "12px",
              marginBottom: "12px",
            }}>
              <h3>{title}</h3>
              {fields.map((field) => (
                <FormFactory<EventInputSchema> key={field.id} {...field} />
              ))}
            </section>
          ))}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '60px',
            margin: "20px 0"
          }}>
            <FormButton name="キャンセル" type='cancel' onClick={() => window.location.href = '/admin/events'} />
            <FormButton name="新規作成" type='submit' />
          </div>
        </form>
      </main>
    </>
  );
};

export default NewEventPage;
