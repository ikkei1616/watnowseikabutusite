import { Control, FieldValues, set } from "react-hook-form";
import { EventInputSchema } from "./eventFormSchema";
import { FormFactoryProps } from "@/components/form/FormFactory";
import { NumberInputProps } from "@/components/form/NumberInput";
import { TextInputProps } from "@/components/form/TextInput";
import { YEARS_OPTIONS } from "@/const";


export type FormField<T extends FieldValues> = {
    id: number;
} & FormFactoryProps<T>;

export type AddAwardField<T extends FieldValues = any> = {
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

export const releaseMonth = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
}));

export const yearOptions = YEARS_OPTIONS.map((year) => {
    return { value: year, label: `${year}` };
});

export const useFormFields = (
    control: Control<EventInputSchema>,
    awardFields: FormField<EventInputSchema>[],
    addAwardField: () => void
  ): { container: string; title: string; fields: FormField<EventInputSchema>[] }[] => {
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
              placeholder: "例) ハッカソン2024",
            },
          },
          {
            id: 2,
            type: "TEXTAREA_INPUT",
            props: {
              control,
              name: "comment",
              label: "イベント概要(コメント)",
              placeholder: "例) watnowで1番の大イベント...",
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
              placeholder: "例) 大阪府",
            },
          },
          {
            id: 5,
            type: "TEXT_INPUT",
            props: {
              control,
              name: "url",
              label: "関連URL",
              placeholder: "https://",
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
          ...awardFields,
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