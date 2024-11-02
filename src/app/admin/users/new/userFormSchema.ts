import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const imageSchema = z.instanceof(File)
    .refine(file => file.type.startsWith('image/'), {
        message: 'ファイルの形式は画像でなければなりません。',
    })
    .refine(file => file.size <= 5 * 1024 * 1024, { // 5MB
        message: 'ファイルのサイズは5MB以下でなければなりません。',
    });

const serviceSchema = z.object({
    iconImage: z.union([z.instanceof(File), z.undefined()]).optional()
        .refine(file => file === undefined || imageSchema.safeParse(file).success, {
            message: 'サムネイル画像の形式またはサイズが無効です。',
        }),
    name: z.string().min(1, "ユーザ名は必須です"),
    nickname: z.string().min(1, "ニックネームは必須です"),
    introduction: z.string().optional(),
    account_id: z.string().min(1, "ユーザIDは必須です").regex(/^[a-zA-Z0-9]+$/, {
        message: "半角英数字のみ使用できます",
    }),
    technologiesId: z.number().array().optional(),
    x_id: z.string().optional().refine((val) => !val || /^[a-zA-Z0-9]+$/.test(val), {
      message: "半角英数字のみ使用できます",
    }),
    instagram_id:z.string().optional().refine((val) => !val || /^[a-zA-Z0-9]+$/.test(val), {
        message: "半角英数字のみ使用できます",
      }),
    github_id: z.string().optional().refine((val) => !val || /^[a-zA-Z0-9]+$/.test(val), {
        message: "半角英数字のみ使用できます",
      }),
});

export type ServiceInputSchema = z.input<typeof serviceSchema>;
export type ServiceOutputSchema = z.output<typeof serviceSchema>;
export const resolver = zodResolver(serviceSchema);
