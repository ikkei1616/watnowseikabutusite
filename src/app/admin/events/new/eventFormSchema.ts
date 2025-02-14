import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// 画像の検証スキーマ
const imageSchema = z.instanceof(File)
  .refine(file => file.type.startsWith('image/'), {
    message: 'ファイルの形式は画像でなければなりません。',
  })
  .refine(file => file.size <= 5 * 1024 * 1024, { // 5MBのサイズ制限
    message: 'ファイルのサイズは5MB以下でなければなりません。',
  });

// 表彰のスキーマ
const awardSchema = z.object({
  name: z.string().optional(),
  order_num :  z.number().min(0, "正の整数を入力してください").optional()
});

// イベントの検証スキーマ
const eventSchema = z.object({
  name: z.string().min(1, "イベントタイトルは必須です。"),
  comment: z.string().optional().nullable(),
  location: z.string().optional(),
  release_year: z.union([z.number({ message: '開催年は必須です。' }), z.string()]),
  release_month: z.union([z.number({ message: '開催月は必須です。' }), z.string()]),
  url: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  thumbnailImage: z.union([z.instanceof(File), z.undefined()]).optional()
      .refine(file => file === undefined || imageSchema.safeParse(file).success, {
          message: 'サムネイル画像の形式またはサイズが無効です。',
      }),
  awards: z.array(awardSchema).optional(),
}).refine(data => data.release_year && data.release_month, {
  message: '開催年と月の両方を入力してください。',
  path: ['release_year', 'release_month'],
});

export type EventInputSchema = z.input<typeof eventSchema>;
export type EventOutputSchema = z.output<typeof eventSchema>;
export const resolver = zodResolver(eventSchema);
