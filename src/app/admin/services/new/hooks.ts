import { ServiceInputSchema } from "./serviceFormSchema";
import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FormFactoryProps } from "@/components/form/FormFactory";
import { YEARS_OPTIONS } from "@/const";

export type FormField<T extends FieldValues> = {
    id: number;
} & FormFactoryProps<T>;

export type EventData = {
    value: string;
    label: string;
}

export type AwardData = {
    value: string;
    label: string;
}

export type MenberData = {
    value: string;
    label: string;
}

export type TechData = {
    value: string;
    label: string;
}

export const yearOptions = YEARS_OPTIONS.map((year) => {
    return { value: year, label: `${year}` };
});

export const period = [
    { value: "日間", label: "日" },
    { value: "週間", label: "週" },
    { value: "カ月間", label: "カ月" },
    { value: "年間", label: "年" },
]

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

export const createFormFields = (
    control: Control<ServiceInputSchema>,
    events: EventData[],
    awards: AwardData[],
    menbers: MenberData[],
    techs: TechData[],
    defaultThumbnail?: string,
    defaultDemo?: string,
    onChangeEventYear?: (item:string) => void,
    onChangeEvent?: (item:string) => void,
): { container: string, title: string, fields: FormField<ServiceInputSchema>[] }[] => {

    return [
        {
            container: "serviceInfo",
            title: "サービス情報",
            fields: [
                {
                    id: 1,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "name",
                        label: "サービスタイトル",
                        required: true,
                        placeholder: "例) watbox",
                    },
                },
                {
                    id: 2,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "comment",
                        label: "コメント",
                        placeholder: "例) watnowのメンバーが作ったプロダクトを一覧できるサイト",
                    },
                },
                {
                    id: 3,
                    type: "TEXTAREA_INPUT",
                    props: {
                        control,
                        name: "description",
                        label: "サービス詳細",
                        placeholder: "例) watnowの過去プロダクトって何があったっけ? そんな悩みを解決するべく誕生したサービスです。 watnowの今までの軌跡を、年度ごと・イベントごとに振り返ることが可能です。",
                    }
                },
                {
                    id: 4,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "team_name",
                        label: "チーム名",
                        placeholder: "例) watbox政策委員会",
                    },
                },
                {
                    id: 5,
                    type: "DATE_INPUT",
                    props: {
                        control,
                        name: ["release_year", "release_month"],
                        label: "リリース日",
                        options: [yearOptions, releaseMonth],
                        required: true,
                    }
                },
                {
                    id: 6,
                    type: "PERIOD_INPUT",
                    props: {
                        control,
                        name: ["development_period_num", "development_period_unit"],
                        label: "開発期間",
                        options: period,
                        placeholder: "例) 1",
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
                        name: "teamMembers",
                        label: "製作者を追加する",
                        options: menbers,
                        shapeType: "square",
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
                        name: "technologiesId",
                        label: "技術を追加する",
                        options: techs,
                        shapeType: "rounded",
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
                        options: yearOptions,
                        ending: "年開催",
                        onChangeItem: onChangeEventYear,
                    },
                },
                {
                    id: 10,
                    type: "SELECT_INPUT",
                    props: {
                        control,
                        name: "event_id",
                        options: events,
                        onChangeItem: onChangeEvent,
                    },
                },
                {
                    id: 11,
                    type: "SELECT_INPUT",
                    props: {
                        control,
                        name: "award_id",
                        label: "表彰",
                        options: awards,
                    },
                },
            ],
        },
        {
            container: "url",
            title: "URL",
            fields: [
                {
                    id: 12,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "url_web",
                        label: "Webサイト",
                        placeholder: "https://"
                    }
                },
                {
                    id: 13,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "url_appstore",
                        label: "App Store",
                        placeholder: "https://"
                    }
                },
                {
                    id: 14,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "url_googleplay",
                        label: "Google Play",
                        placeholder: "https://"
                    }
                },
                {
                    id: 15,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "url_others",
                        label: "その他",
                        placeholder: "https://"
                    }
                }
            ]
        },
        {
            container: "media",
            title: "メディア",
            fields: [
                {
                    id: 16,
                    type: "IMAGE_INPUT",
                    props: {
                        control,
                        name: "thumbnailImage",
                        label: "サムネイル画像",
                        type: "image",
                        defaultValue: defaultThumbnail,
                    }
                },
                {
                    id: 17,
                    type: "IMAGE_INPUT",
                    props: {
                        control,
                        name: "demoVideo",
                        label: "デモ動画",
                        type: "video",
                        defaultValue: defaultDemo,
                    }
                }
            ]
        },
        {
            container: "public",
            title: "公開設定",
            fields: [
                {
                    id: 18,
                    type: "CHECKBOX",
                    props: {
                        control,
                        name: "is_visible",
                        label: "サービスを非公開にする（データは削除されません）"
                    }
                }
            ]
        }
    ];
}

