import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
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
    name: z.string().min(1, "サービス名は必須です"),
    nickname: z.string().optional(),
    user_id: z.string().optional(),
    introduction: z.string().optional(),
    account_id: z.string().optional(),
    technologiesId: z.number().array().optional(),
    x_id: z.string().optional(),
    instagram_id: z.string().optional(),
    github_id: z.string().optional(),
});

export type ServiceInputSchema = z.input<typeof serviceSchema>;
export type ServiceOutputSchema = z.output<typeof serviceSchema>;
export const resolver = zodResolver(serviceSchema);
