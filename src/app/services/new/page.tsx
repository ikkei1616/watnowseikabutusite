"use client";
import React from 'react';
import TextInput from '@/components/TextInput';
import TextareaInput from '@/components/TextareaInput';
import ImageInput from '@/components/ImageInput';
import NumberInput from '@/components/NumberInput';
import Select from '@/components/Select';
import { SubmitHandler, useForm } from "react-hook-form";
import {ServiceInputSchema,ServiceOutputSchema,resolver } from "./serviceFormSchema"

const NewServicesPage = () => {

    const { register, handleSubmit,formState: { errors } } = useForm<ServiceInputSchema>({
        mode: "onChange",
        resolver: resolver,
    });

    const onSubmit= (data:ServiceOutputSchema) => {
        console.log(data);
    }
    
    const event = [
        { value: 'event1', label: 'event1' },
        { value: 'event2', label: 'event2' },
        { value: 'event3', label: 'event3' },
    ]

    const period = [
        {value: "1", label: "days"},
        {value: "2", label: "weeks"},
        {value: "3", label: "months"},
        {value: "4", label: "years"},
    ]
  return (
    <>
      <main>
        <h1>新規サービス作成</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextInput id="serviceName" label='サービス名' register={register} errors={errors}/>
          </div>
          <div>
            <TextareaInput id="description" label='サービス情報' register={register} errors={errors}/>
          </div>
          <div>
            <TextInput id="teamName" label='チーム名' register={register} errors={errors}/>
          </div>
          <div>
            <ImageInput id="serviceImage" label='画像' register={register} errors={errors}/>
          </div>
          <div>
            <TextInput id="award" label='賞' register={register} errors={errors}/>
          </div>
          <div>
            <Select id="selectEvent" label='イベント' options={event} register={register} errors={errors}/>
          </div>
          <div>
            <TextareaInput id="serviceDetail" label='サービス詳細情報' register={register} errors={errors}/>
          </div>
          <div>
            <NumberInput id="developmentPeriodNum" label='開発期間' register={register} errors={errors}/>
            <Select id="developmentPeriod" label='' options={period} register={register} errors={errors}/>
          </div>
          <button type="submit">送信</button>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;
