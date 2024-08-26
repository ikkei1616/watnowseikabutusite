"use client";
import React from 'react';
import TextInput from '@/components/TextInput';
import TextareaInput from '@/components/TextareaInput';
import ImageInput from '@/components/ImageInput';
import NumberInput from '@/components/NumberInput';
import Select from '@/components/Select';
import { SubmitHandler, useForm } from "react-hook-form";
import { ServiceInputSchema, ServiceOutputSchema, resolver } from "./serviceFormSchema"
import { event, period } from "@/constants"

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
          <div>
            <TextInput control={control} name="serviceName" label='サービス名'  />
          </div>
           <div>
            <TextareaInput control={control} name="serviceInfo" label='サービス情報'  />
          </div>
          <div>
            <TextInput control={control} name="teamName" label='チーム名' />
          </div>
          
          <div>
            <ImageInput control={control} name="serviceImage" label='画像' />
          </div>
          <div>
            <TextInput control={control} name="award" label='賞' />
          </div>
          <div>
            <Select control={control} name="selectEvent" label='イベント' options={event} />
          </div>
          <div>
            <TextareaInput control={control} name="serviceDetail" label='サービス詳細情報' />
          </div>
          <div>
            <NumberInput control={control} name="developmentPeriodNum" label='開発期間' />
            <Select control={control} name="developmentPeriod" label='' options={period} /> 
          </div>
          <button type="submit">送信</button>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;
