import { ServiceInputSchema } from "./serviceFormSchema";
import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FormFactoryProps } from "@/components/FormFactory";
import { supabase } from '../../../../supabase/supabase';
import { useEffect, useState } from "react";


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

export const period = [
    { value: "days", label: "日" },
    { value: "weeks", label: "週" },
    { value: "months", label: "月" },
    { value: "years", label: "年" },
]

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
): { container: string, title: string, fields: FormField<ServiceInputSchema>[] }[] => {
    const [events, setEvents] = useState<{ value: string; label: string }[]>([]);
    const [awards, setAwards] = useState<{ value: string; label: string }[]>([]);
    const [menbers, setMenbers] = useState<{ value: string; label: string }[]>([]);
    const [techs, setTechs] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: eventsData, error: eventsError } = await supabase
                    .from('events')
                    .select('id, name')
                    .order('id', { ascending: true });

                if (eventsError) {
                    throw new Error(`Error fetching events: ${eventsError.message}`);
                }

                const { data: awardsData, error: awardsError } = await supabase
                    .from('awards')
                    .select('id, name') // 必要なカラムを指定
                    .order('id', { ascending: true });

                if (awardsError) {
                    throw new Error(`Error fetching awards: ${awardsError.message}`);
                }
                const { data: menbersData, error: menbersError } = await supabase
                    .from('users')
                    .select('id, name, nickname')

                if (menbersError) {
                    throw new Error(`Error fetching menbers: ${menbersError.message}`);
                }
                const { data: techsData, error: techsError } = await supabase
                    .from('technologies')
                    .select('id, name')

                if (techsError) {
                    throw new Error(`Error fetching techs: ${techsError.message}`);
                }

                // イベントと賞の情報を状態に設定
                setEvents(eventsData.map((event) => ({ value: event.id, label: event.name })) || []);
                setAwards(awardsData.map((award) => ({ value: award.id, label: award.name })) || []);
                setMenbers(menbersData.map((menber) => ({ value: menber.id, label: `${menber.name}　(${menber.nickname})` })) || []);
                setTechs(techsData.map((tech) => ({ value: tech.id, label: tech.name })) || []);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


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
                    type: "TEXTAREA_INPUT",
                    props: {
                        control,
                        name: "description",
                        label: "サービス詳細"
                    }
                },
                {
                    id: 4,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "team_name",
                        label: "チーム名",
                    },
                },
                {
                    id: 5,
                    type: "DATE_INPUT",
                    props: {
                        control,
                        name: ["release_year", "release_month"],
                        label: "リリース日",
                        options: [releaseYear, releaseMonth],
                        required: true
                    }
                },
                {
                    id: 6,
                    type: "PERIOD_INPUT",
                    props: {
                        control,
                        name: ["development_period_num", "development_period_unit"],
                        label: "開発期間",
                        options: period
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
                        options: eventYear,
                        ending: "年開催",
                    },
                },
                {
                    id: 10,
                    type: "SELECT_INPUT",
                    props: {
                        control,
                        name: "event_id",
                        options: events,
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
                        label: "Webサイト"
                    }
                },
                {
                    id: 13,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "url_appstore",
                        label: "App Store"
                    }
                },
                {
                    id: 14,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "url_googleplay",
                        label: "Google Play"
                    }
                },
                {
                    id: 15,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "url_others",
                        label: "その他"
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
                        type: "image"
                    }
                },
                {
                    id: 17,
                    type: "IMAGE_INPUT",
                    props: {
                        control,
                        name: "demoVideo",
                        label: "デモ動画",
                        type: "video"
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

