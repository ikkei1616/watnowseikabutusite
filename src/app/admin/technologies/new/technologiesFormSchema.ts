import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const imageSchema = z.instanceof(File)
  .refine(file => file.type.startsWith('image/'), {
    message: 'ファイルの形式は画像でなければなりません。',
  })
  .refine(file => file.size <= 5 * 1024 * 1024, { // 5MB
    message: 'ファイルのサイズは5MB以下でなければなりません。',
  });

const technologySchema = z.object({
  name: z.string().min(1, "技術名は必須です"),
  iconImage: z.union([z.instanceof(File), z.undefined()]).optional()
  .refine(file => file === undefined || imageSchema.safeParse(file).success, {
    message: '画像の形式またはサイズが無効です。',
  }),
});

export type TechnologyInputSchema = z.input<typeof technologySchema>;
export type TechnologyOutputSchema = z.output<typeof technologySchema>;
export const resolver = zodResolver(technologySchema);
