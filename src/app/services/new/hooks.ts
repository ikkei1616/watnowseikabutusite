import { ServiceInputSchema } from "./serviceFormSchema";
import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FormFactoryProps } from "@/components/FormFactory";


type FormField<T extends FieldValues> = {
    id: number;
} & FormFactoryProps<T>;

export const eventYear = [
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
];

export const event = [
    { value: 'event1', label: 'event1' },
    { value: 'event2', label: 'event2' },
    { value: 'event3', label: 'event3' },
];

export const award = [
    { value: 'award1', label: 'award1' },
    { value: 'award2', label: 'award2' },
    { value: 'award3', label: 'award3' },
];

export const period = [
    { value: "days", label: "日" },
    { value: "weeks", label: "週" },
    { value: "months", label: "月" },
    { value: "years", label: "年" },
]

export const menberNames = [
    { value: '小林虎太郎', label: '小林虎太郎' },
    { value: '小林寅之助', label: '小林寅之助' },
    { value: '小林こたつ', label: '小林こたつ' },
];

export const techNames = [
    { value: 'React', label: 'React' },
    { value: 'Vue', label: 'Vue' },
    { value: 'Angular', label: 'Angular' },
];

export const releaseYear = [
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
];

export const releaseMonth = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
];

export const useFormFields = (
    control: Control<ServiceInputSchema>,
): { container: string, title: string, fields: FormField<ServiceInputSchema>[] }[] => [
    {
        container: "serviceInfo",
        title: "サービス情報",
        fields: [
            {
                id: 1,
                type: "TEXT_INPUT",
                props: {
                    control,
                    name: "serviceName",
                    label: "サービスタイトル",
                    required: true,
                },
            },
            {
                id: 2,
                type: "TEXT_INPUT",
                props: {
                    control,
                    name: "comment",
                    label: "コメント",
                },
            },
            {
                id: 3,
                type:"TEXTAREA_INPUT",
                props:{
                    control,
                    name:"serviceDetail",
                    label:"サービス詳細"
                }
            },
            {
                id: 4,
                type: "TEXT_INPUT",
                props: {
                    control,
                    name: "teamName",
                    label: "チーム名",
                },
            },
            {
                id: 5,
                type:"DATE_INPUT",
                props:{
                    control,
                    name:["releaseYear", "releaseMonth"],
                    label:"リリース日",
                    options:[releaseYear, releaseMonth],
                    required:true
                }
            },
            {
                id: 6,
                type:"PERIOD_INPUT",
                props:{
                    control,
                    name:["periodNumber", "periodUnit"],
                    label:"開発期間",
                    options:period
                }
            }
        ],
    },
    {
        container: "producer",
        title: "製作者",
        fields: [
            {
                id: 7,
                type: "MULTIPLE_SELECT",
                props: {
                    control,
                    name: "teamMenbers",
                    label: "製作者を追加する",
                    options: menberNames,
                },
            },
        ],
    },
    {
        container: "tech",
        title: "技術スタック",
        fields: [
            {
                id: 8,
                type: "MULTIPLE_SELECT",
                props: {
                    control,
                    name: "technologies",
                    label: "技術を追加する",
                    options: techNames,
                },
            },
        ],
    },
    {
        container: "event",
        title: "イベント",
        fields: [
            {
                id: 9,
                type: "SELECT_INPUT",
                props: {
                    control,
                    name: "eventYear",
                    label: "イベントの変更",
                    options: eventYear,
                    ending: "年開催",
                },
            },
            {
                id: 10,
                type: "SELECT_INPUT",
                props: {
                    control,
                    name: "eventName",
                    options: event,
                },
            },
            {
                id: 11,
                type: "SELECT_INPUT",
                props: {
                    control,
                    name: "awardName",
                    label: "表彰",
                    options: award,
                },
            },
        ],
    },
    {
        container:"url",
        title:"URL",
        fields:[
            {
                id:12,
                type:"TEXT_INPUT",
                props:{
                    control,
                    name:"urlWeb",
                    label:"Webサイト"
                }
            },
            {
                id:13,
                type:"TEXT_INPUT",
                props:{
                    control,
                    name:"urlAppStore",
                    label:"App Store"
                }
            },
            {
                id:14,
                type:"TEXT_INPUT",
                props:{
                    control,
                    name:"urlGooglePlay",
                    label:"Google Play"
                }
            },
            {
                id:15,
                type:"TEXT_INPUT",
                props:{
                    control,
                    name:"urlOthers",
                    label:"その他"
                }
            }
        ]
    },
    {
        container:"media",
        title:"メディア",
        fields:[
            {
                id:16,
                type:"IMAGE_INPUT",
                props:{
                    control,
                    name:"thumbnailImage",
                    label:"サムネイル画像"
                }
            },
            {
                id:17,
                type:"IMAGE_INPUT",
                props:{
                    control,
                    name:"demoVideo",
                    label:"デモ動画"
                }
            }
        ]
    },
    {
        container:"public",
        title:"公開設定",
        fields:[
            {
                id:18,
                type:"CHECKBOX",
                props:{
                    control,
                    name:"publicCheck",
                    label:"サービスを非公開にする（データは削除されません）"
                }
            }
        ]
    }
];

    