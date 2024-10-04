"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "./serviceFormSchema";
import { useFormFields } from "./hooks";
import { FormFactory } from "@/components/FormFactory";
import FormButton from '@/components/FormButton';
import { supabase } from '../../../supabase/supabase';

const NewServicesPage = () => {
  const { control, handleSubmit } = useForm<ServiceInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });

  const onSubmit: SubmitHandler<ServiceOutputSchema> = async (data) => {
    console.log(data);
    if(data.thumbnailImage){
      const fileName = encodeURIComponent(`${Date.now()}-${data.thumbnailImage.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      const { data: uploadData, error } = await supabase.storage
        .from('service_images')
        .upload(fileName, data.thumbnailImage);

      if (error) {
        console.error('Error uploading file: ', error.message);
        return;
      }

      
    }
  };


  const formFields = useFormFields(control);

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
            margin:"20px 0"
          }}>
          <FormButton name="キャンセル" type='cancel'/>
          <FormButton name="新規作成" type='submit'/>
          </div>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;
