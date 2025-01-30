import { Control, FieldValues } from "react-hook-form";
import { EventInputSchema } from "./eventFormSchema";
import { FormFactoryProps } from "@/components/form/FormFactory";
import { NumberInputProps } from "@/components/form/NumberInput";
import { TextInputProps } from "@/components/form/TextInput";
import { YEARS_OPTIONS } from "@/const";
import FormFieldType from "@/types/FormFieldType";


// 汎用フィールド型
export type FormField<T extends FieldValues> = {
  id: number;
} & FormFactoryProps<T>;

export type AddAwardField<T extends FieldValues = any> = {
  id: number;
} & (
  | {
      type: FormFieldType.textInput;
      props: TextInputProps<T>;
    }
  | {
      type: FormFieldType.numberInput;
      props: NumberInputProps<T>;
    }
);

// 開催月オプション
export const releaseMonthOptions = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  label: (index + 1).toString(),
}));

// 年オプション
export const yearOptions = YEARS_OPTIONS.map((year) => ({
  value: year,
  label: `${year}`,
}));

// 動的なフォームフィールド生成
export const createFormFields = (
  control: Control<EventInputSchema>,
  awardFields:any, //ここよくない後で直して
  addAwardField: () => void, // 表彰フィールドを追加する関数
  defaultImage?: string
): { container: string; title: string; fields: FormField<EventInputSchema>[] }[] => {
  return [
    {
      container: "serviceInfo",
      title: "イベント情報",
      fields: [
        {
          id: 1,
          type: FormFieldType.textInput,
          props: {
            control,
            name: "name",
            label: "イベントタイトル",
            required: true,
            placeholder: "例) ハッカソン2024",
          },
        },
        {
          id: 2,
          type: FormFieldType.textareaInput,
          props: {
            control,
            name: "comment",
            label: "イベント概要(コメント)",
            placeholder: "例) watnowで1番の大イベント...",
          },
        },
        {
          id: 3,
          type: FormFieldType.dateInput,
          props: {
            control,
            name: ["release_year", "release_month"],
            label: "開催時期",
            options: [yearOptions, releaseMonthOptions],
            required: true,
          },
        },
        {
          id: 4,
          type: FormFieldType.textInput,
          props: {
            control,
            name: "location",
            label: "開催場所",
            placeholder: "例) 大阪府",
          },
        },
        {
          id: 5,
          type: FormFieldType.textInput,
          props: {
            control,
            name: "url",
            label: "関連URL",
            placeholder: "https://",
          },
        },
        {
          id: 6,
          type: FormFieldType.imageInput,
          props: {
            control,
            name: "thumbnailImage",
            label: "サムネイル画像",
            type: "image",
            defaultValue: defaultImage,
          },
        },
      ],
    },
    {
      container: "producer",
      title: "表彰",
      fields: [
        ...awardFields,
        {
          id: 1000,
          type: FormFieldType.addButton,
          props: {
            name: "表彰を増やす",
            onClick: addAwardField,
          },
        },
      ],
    },
  ];
};
