import { ServiceInputSchema } from "./serviceFormSchema";
import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import {FormFactoryProps} from "@/components/FormFactory";


type FormField<T extends FieldValues> ={
    id:number;
}& FormFactoryProps<T>;

export const event = [
    { value: 'event1', label: 'event1' },
    { value: 'event2', label: 'event2' },
    { value: 'event3', label: 'event3' },
]

export const period = [
    {value: "days", label: "days"},
    {value: "weeks", label: "weeks"},
    {value: "months", label: "months"},
    {value: "years", label: "years"},
]

export const useFormFields = (
  control: Control<ServiceInputSchema>,
): FormField<ServiceInputSchema>[] => [
  {
    id: 1,
    type: "TEXT_INPUT",
    props: {
      control,
      name: "serviceName",
      label: "サービス名",
    },
  },
    {
        id: 2,
        type: "TEXTAREA_INPUT",
        props: {
        control,
        name: "serviceInfo",
        label: "サービス情報",
        },
    },
    {
        id: 3,
        type: "TEXT_INPUT",
        props: {
        control,
        name: "teamName",
        label: "チーム名",
        },
    },
    {
        id: 4,
        type: "IMAGE_INPUT",
        props: {
        control,
        name: "serviceImage",
        label: "画像",
        },
    },
    {
        id: 5,
        type: "TEXT_INPUT",
        props: {
        control,
        name: "award",
        label: "賞",
        },
    },
    {
        id: 6,
        type: "SELECT_INPUT",
        props: {
        control,
        name: "selectEvent",
        label: "イベント",
        options: event,
        },
    },
    {
        id: 7,
        type: "TEXTAREA_INPUT",
        props: {
        control,
        name: "serviceDetail",
        label: "サービス詳細情報",
        },
    },
    {
        id: 8,
        type: "NUMBER_INPUT",
        props: {
        control,
        name: "developmentPeriodNum",
        label: "開発期間",
        },
    },
    {
        id: 9,
        type: "SELECT_INPUT",
        props: {
        control,
        name: "developmentPeriod",
        label: "単位",
        options: period,
        },
    },
];