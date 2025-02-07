import { TechnologyInputSchema } from "./technologiesFormSchema";
import { Control } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FormFactoryProps } from "@/components/form/FormFactory";

export type FormField<T extends FieldValues> = {
    id: number;
} & FormFactoryProps<T>;

export const createFormFields = (
    control: Control<TechnologyInputSchema>,
    defaultIcon?: string,
): { container: string, title: string, fields: FormField<TechnologyInputSchema>[] }[] => {
    return [
        {
            container: "technologiesInfo",
            title: "技術情報",
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
                    }
                },
                {
                    id: 2,
                    type: "TEXT_INPUT",
                    props: {
                        control,
                        name: "name",
                        label: "技術スタック名",
                        required: true,
                        placeholder: "例) JavaScript",
                    },
                },
            ],
        }
    ];
}

