"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "./serviceFormSchema";
import { useFormFields } from "./hooks";
import { FormFactory } from "@/components/FormFactory";
import MultipleSelect from '@/components/MultipleSelect';

const NewServicesPage = () => {
  const { control, handleSubmit } = useForm<ServiceInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });


  const onSubmit: SubmitHandler<ServiceOutputSchema> = (data) => {
    console.log(data);
  };

  return (
    <>
      <main>
        <h1>新規サービス作成</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            useFormFields(control).map((field, index) => (
              <FormFactory<ServiceInputSchema> key={field.id} {...field} />
            ))
          }
          <button type="submit">送信</button>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;
