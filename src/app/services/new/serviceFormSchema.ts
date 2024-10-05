import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const imageSchema = z.instanceof(File)
  .refine(file => file.type.startsWith('image/'), {
    message: 'ファイルの形式は画像でなければなりません。',
  })
  .refine(file => file.size <= 5 * 1024 * 1024, { // 5MB
    message: 'ファイルのサイズは5MB以下でなければなりません。',
  });

const videoSchema = z.instanceof(File)
  .refine(file => file.type.startsWith('video/'), {
    message: 'ファイルの形式は動画でなければなりません。',
  })
  .refine(file => file.size <= 100 * 1024 * 1024, { // 100MB
    message: 'ファイルのサイズは100MB以下でなければなりません。',
  });

const serviceSchema = z.object({
  name: z.string().min(1, "サービス名は必須です"),
  comment: z.string().optional(),
  description: z.string().optional(),
  team_name: z.string().optional(),
  development_period_num: z.number().optional(),
  development_period_unit: z.string().optional(),
  release_year: z.number({message: 'リリース日は必須です。'}),
  release_month: z.number({message: 'リリース日は必須です。'}),
  teamMembers: z.string().array().optional(),
  technologiesId: z.number().array().optional(),
  eventYear: z.number().optional(),
  event_id: z.number().optional(),
  award_id: z.number().optional(),
  url_web: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  url_appstore: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  url_googleplay: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  url_others: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  thumbnailImage: z.union([z.instanceof(File), z.undefined()]).optional()
  .refine(file => file === undefined || imageSchema.safeParse(file).success, {
    message: 'サムネイル画像の形式またはサイズが無効です。',
  }),
demoVideo: z.union([z.instanceof(File), z.undefined()]).optional()
  .refine(file => file === undefined || videoSchema.safeParse(file).success, {
    message: 'デモ動画の形式またはサイズが無効です。',
  }),
  is_visible: z.boolean(),
}).refine(data => data.release_year && data.release_month, {
  message: 'リリース年と月の両方を入力してください。',
  path: ['release_year', 'release_month'],
});

export type ServiceInputSchema = z.input<typeof serviceSchema>;
export type ServiceOutputSchema = z.output<typeof serviceSchema>;
export const resolver = zodResolver(serviceSchema);
