"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { EventInputSchema, EventOutputSchema, resolver } from "./eventFormSchema";
import { useFormFields } from "./hooks";
import { FormFactory } from "@/components/form/FormFactory";
import FormButton from '@/components/form/FormButton';
import { supabase } from '@/supabase/supabase';

const NewEventPage = () => {
  const { control, handleSubmit } = useForm<EventInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit: SubmitHandler<EventOutputSchema> = async (data) => {
    // setIsLoading(true);

    let imageUrl = '';

    // サムネイル画像の処理
    if (data.thumbnailImage instanceof File) {
      const imageFileName = encodeURIComponent(`${Date.now()}-${data.thumbnailImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const { error: uploadError } = await supabase.storage
        .from('event_images')
        .upload(imageFileName, data.thumbnailImage);

      if (uploadError) {
        console.error('Error uploading file: ', uploadError.message);
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
    const date = new Date(`${release_year}-${release_month}-02`);
    const submitData = { ...rest, image: imageUrl, date: date };

    const { data: eventData, error: insertError } = await supabase
      .from('events')
      .insert([submitData])
      .select();

    if (insertError) {
      console.error('Error inserting event:', insertError);
      setIsLoading(false);
      return;
    }

    if(data.awards?.length !== 0 && data.awards !== undefined) {
      const awardsToInsert = data.awards.map((award) => {
        return {
          ...award,
          event_id: eventData[0].id,
        };
      });

      console.log(awardsToInsert);

      const {error: insertError } = await supabase
        .from('awards')
        .insert(awardsToInsert)
        .select();

      if (insertError) {
        console.error('Error inserting award:', insertError);
        setIsLoading(false);
        return;
      }
    }

    window.location.href = '/admin/events/existing-page';
  };

  const formFields = useFormFields(control);

  if (isLoading) {
    return <div>ローディング中...</div>;
  }

  return (
    <>
      <main style={{
        width: "90%",
        margin: "0 auto",
      }}>
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
