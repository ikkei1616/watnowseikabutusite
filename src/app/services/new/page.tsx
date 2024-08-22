"use client";
import React from 'react';
import TextInput from '@/components/TextInput';
import TextareaInput from '@/components/TextareaInput';
import ImageInput from '@/components/ImageInput';
import NumberInput from '@/components/NumberInput';
import Select from '@/components/Select';
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NewServicesPage = () => {

const serviceSchema = z
    .object({
        serviceName: z.string().min(1,"サービス名は必須です"),
        description: z.string(),
        teamName: z.string(),
        serviceImage: z.string(),
        award: z.string(),
        selectEvent: z.string(),
        serviceDetail: z.string(),
        developmentPeriodNum: z.number(),
        developmentPeriod: z.string(),
    })

    type Service = z.infer<typeof serviceSchema>;

    const { register, handleSubmit,formState: { errors } } = useForm<Service>({
        mode: "onChange",
        resolver: zodResolver(serviceSchema),
    });

    const onSubmit= (data: Service) => {
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
            <TextareaInput id="description" label='サービス情報' />
          </div>
          <div>
            <TextInput id="teamName" label='チーム名' register={register}/>
          </div>
          <div>
            <ImageInput id="serviceImage" label='画像' />
          </div>
          <div>
            <TextInput id="award" label='賞' register={register}/>
          </div>
          <div>
            <Select id="selectEvent" label='イベント' options={event} />
          </div>
          <div>
            <TextareaInput id="serviceDetail" label='サービス詳細情報' />
          </div>
          <div>
            <NumberInput id="developmentPeriodNum" label='開発期間' />
            <Select id="developmentPeriod" label='' options={period} />
          </div>
          <button type="submit">完了</button>
        </form>
      </main>
    </>
  );
};

export default NewServicesPage;
