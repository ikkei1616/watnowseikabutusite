import { useEffect, useState } from "react";
import { Control, FieldValues, set } from "react-hook-form";
import { EventInputSchema } from "./eventFormSchema";
import { FormFactoryProps } from "@/components/form/FormFactory";
import { NumberInputProps } from "@/components/form/NumberInput";
import { TextInputProps } from "@/components/form/TextInput";


type FormField<T extends FieldValues> = {
    id: number;
} & FormFactoryProps<T>;

type AddAwardField<T extends FieldValues = any> = {
    id: number;
} & (
    | {
        type: "TEXT_INPUT";
        props: TextInputProps<T>;
    }
    | {
        type: "NUMBER_INPUT";
        props: NumberInputProps<T>;
    }
);

const generateYearOptions = (startYear: number) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
        const year = startYear + index;
        return { value: year, label: year.toString() };
    });
};

const convertToFormField = (awardField: AddAwardField): FormField<EventInputSchema> => {
    return {
        id: awardField.id,
        type: awardField.type, // 必要なプロパティを追加
        props: {
            control: awardField.props.control,
            name: awardField.props.name as keyof EventInputSchema,
            label: awardField.props.label,
        },
    };
};

export const yearOptions = generateYearOptions(2020);

export const releaseMonth = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
}));

export const useFormFields = (control: Control<EventInputSchema>): { container: string, title: string, fields: FormField<EventInputSchema>[] }[] => {
    
    const [awardFields, setAwardFields] = useState< AddAwardField[]>([]);

    useEffect(() => {
        addAwardField();
    }, []);

    const addAwardField = () => {
        const newId = awardFields.length;
        if (newId === 0) {
            setAwardFields(() => [
                {
                    id: 7 + newId, // Adjust ID to avoid duplication
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: `awards[0].name`, // Dynamic name for award name
                        label: `表彰名 ${(newId + 1)}`,
                    },
                },
                {
                    id: 7 + newId + 1,
                    type: "NUMBER_INPUT",
                    props: {
                        control,
                        name: `awards[0].order_num`, // Dynamic name for award count
                        label: `受賞数`,
                    },
                },
            ]);
        } else {
            setAwardFields((prev) => [
                ...prev,
                {
                    id: (newId + 2) * 2, // Adjust ID to avoid duplication
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: `awards[${(newId / 2)}].name`, // Dynamic name for award name
                        label: `表彰名 ${(newId / 2 + 1)}`,
                    },
                },
                {
                    id: (newId + 2) * 2 + 1,
                    type: "NUMBER_INPUT",
                    props: {
                        control,
                        name: `awards[${(newId / 2)}].order_num`, // Dynamic name for award count
                        label: `受賞数`,
                    },
                },
            ]);
        };
    };

    return [
        {
            container: "serviceInfo",
            title: "イベント情報",
            fields: [
                {
                    id: 1,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "name",
                        label: "イベントタイトル",
                        required: true,
                    },
                },
                {
                    id: 2,
                    type: "TEXTAREA_INPUT",
                    props: {
                        control,
                        name: "comment",
                        label: "イベント概要(コメント)",
                    },
                },
                {
                    id: 3,
                    type: "DATE_INPUT",
                    props: {
                        control,
                        name: ["release_year", "release_month"],
                        label: "開催時期",
                        options: [yearOptions, releaseMonth],
                        required: true,
                    },
                },
                {
                    id: 4,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "location",
                        label: "開催場所",
                    },
                },
                {
                    id: 5,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "url",
                        label: "関連URL",
                    },
                },
                {
                    id: 6,
                    type: "IMAGE_INPUT",
                    props: {
                        control,
                        name: "thumbnailImage",
                        label: "サムネイル画像",
                        type: "image",
                    },
                },
            ],
        },
        {
            container: "producer",
            title: "表彰",
            fields: [
                ...awardFields.map(convertToFormField),
                {
                    id: 1000,
                    type: "ADD_BUTTON",
                    props: {
                        name: "表彰を増やす",
                        onClick: addAwardField,
                    },
                },
            ],
        },
    ];
};
