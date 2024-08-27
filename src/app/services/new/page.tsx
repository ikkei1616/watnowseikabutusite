"use client";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "./serviceFormSchema"
import { useFormFields } from "./hooks";
import { FormFactory } from "@/components/FormFactory";

const NewServicesPage = () => {
  const { control, handleSubmit } = useForm<ServiceInputSchema>({
    mode: "onChange",
    resolver: resolver,
  });


  const onSubmit = (data: ServiceOutputSchema) => {
    console.log(data);
  }

  return (
    <>
      <main>
        <h1>新規サービス作成</h1>
        <form onSubmit={handleSubmit((_d) => {
          const d = (_d as unknown) as ServiceOutputSchema;
          onSubmit(d);
        })}>
          {
          useFormFields(control).map((field) => (
            <FormFactory<ServiceInputSchema> {...field} />
          ))
        }
          <button type="submit">送信</button>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;
