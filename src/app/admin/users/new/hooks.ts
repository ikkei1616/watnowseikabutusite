import { UserInputSchema } from "./userFormSchema";
import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FormFactoryProps } from "@/components/form/FormFactory";


export type teckData = {
    value: string;
    label: string;
}

export type FormField<T extends FieldValues> = {
    id: number;
} & FormFactoryProps<T>;

export const createFormFields = (
    control: Control<UserInputSchema>,
    techs?: teckData[],
    defaultIcon?: string
): { container: string, title: string, fields: FormField<UserInputSchema>[] }[] => {

    return [
        {
            container: "userInfo",
            title: "ユーザ情報",
            fields: [
                {
                    id: 1,
                    type: "IMAGE_INPUT",
                    props: {
                        control,
                        name: "iconImage",
                        label: "アイコン画像",
                        type: "image",
                        defaultValue: defaultIcon,
                    },
                },
                {
                    id: 2,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "name",
                        label: "氏名(本名)",
                        placeholder: "例) 山田太郎",
                        required: true,
                    },
                },
                {
                    id: 3,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "nickname",
                        label: "ニックネーム(表示名)",
                        placeholder: "例) たろぴ",
                        required: true,
                    },
                },
                {
                    id: 4,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "account_id",
                        label: "ユーザID(半角英数字)",
                        placeholder: "Tarotan11",
                        required: true,
                        isID: true,
                    },
                },
                {
                    id: 5,
                    type: "TEXTAREA_INPUT",
                    props: {
                        control,
                        name: "introduction",
                        placeholder: "例) パソコンが恋人です。暇さえあればコーディングしてます。つよつよエンジニアになりたい！",
                        label: "自己紹介",
                    }
                },
            ],
        },
        {
            container: "tech",
            title: "技術スタック",
            fields: [
                {
                    id: 6,
                    type: "MULTIPLE_SELECT",
                    props: {
                        control,
                        name: "technologiesId",
                        label: "技術を追加する",
                        options: techs || [],
                        shapeType: "rounded",
                    },
                },
            ],
        },
        {
            container: "sns",
            title: "SNS",
            fields: [
                {
                    id: 7,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "x_id",
                        label: "X(旧Twitter)",
                        isID: true,

                    }
                },
                {
                    id: 8,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "instagram_id",
                        label: "Instagram",
                        isID: true,
                    }
                },
                {
                    id: 9,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "github_id",
                        label: "GitHub",
                        isID: true,
                    }
                },
            ]
        },
    ];
}

