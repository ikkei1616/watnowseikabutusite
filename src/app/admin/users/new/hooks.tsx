import { ServiceInputSchema } from "./userFormSchema";
import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FormFactoryProps } from "@/components/form/FormFactory";
import { supabase } from '../../../../supabase/supabase';
import { useEffect, useState } from "react";


type FormField<T extends FieldValues> = {
    id: number;
} & FormFactoryProps<T>;

export const useFormFields = (
    control: Control<ServiceInputSchema>,
): { container: string, title: string, fields: FormField<ServiceInputSchema>[] }[] => {
    const [techs, setTechs] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: techsData, error: techsError } = await supabase
                    .from('technologies')
                    .select('id, name')

                if (techsError) {
                    throw new Error(`Error fetching techs: ${techsError.message}`);
                }
                setTechs(techsData.map((tech) => ({ value: tech.id, label: tech.name })) || []);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


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
                        type: "image"
                    },
                },
                {
                    id: 2,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "name",
                        label: "氏名(本名)",
                        required: true
                    },
                },
                {
                    id: 3,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "nickname",
                        label: "ニックネーム(表示名)",
                        required: true  
                    },
                },
                {
                    id: 4,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "account_id",
                        label: "ユーザID(半角英数字)",
                        required: true  
                    },
                },
                {
                    id: 5,
                    type: "TEXTAREA_INPUT",
                    props: {
                        control,
                        name: "introduction",
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
                        options: techs,
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
                        label: "X(旧Twitter)"
                    }
                },
                {
                    id: 8,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "instagram_id",
                        label: "Instagram"
                    }
                },
                {
                    id: 9,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "github_id",
                        label: "GitHub"
                    }
                },
            ]
        },
    ];
}

