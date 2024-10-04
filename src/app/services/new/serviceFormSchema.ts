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
  serviceName: z.string().min(1, "サービス名は必須です"),
  comment: z.string().optional(),
  serviceDetail: z.string().optional(),
  teamName: z.string().optional(),
  periodNumber: z.number().optional(),
  periodUnit: z.string().optional(),
  releaseYear: z.number({message: 'リリース日は必須です。'}),
  releaseMonth: z.number({message: 'リリース日は必須です。'}),
  teamMenbers: z.string().array().optional(),
  technologiesId: z.number().array().optional(),
  eventYear: z.number().optional(),
  eventId: z.number().optional(),
  awardId: z.number().optional(),
  urlWeb: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  urlAppStore: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  urlGooglePlay: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  urlOthers: z.string().optional().refine(value => value === '' || z.string().url().safeParse(value).success, {
    message: '無効な URL です。',
  }),
  thumbnailImage: z
    .instanceof(File)
    .refine(file => imageSchema.safeParse(file).success, {
      message: 'サムネイル画像の形式またはサイズが無効です。',
    })
    .optional(),
  demoVideo: z
    .instanceof(File)
    .refine(file => videoSchema.safeParse(file).success, {
      message: 'デモ動画の形式またはサイズが無効です。',
    })
    .optional(),
    publicCheck: z.boolean().optional(),
}).refine(data => data.releaseYear && data.releaseMonth, {
  message: 'リリース年と月の両方を入力してください。',
  path: ['releaseYear', 'releaseMonth'],
}).transform((data) => {
  const thumbnailImageFile = data.thumbnailImage instanceof File ? data.thumbnailImage : undefined;
  const demoVideoFile = data.demoVideo instanceof File ? data.demoVideo : undefined;
  return {
    ...data,
    thumbnailImage: thumbnailImageFile,
    demoVideo: demoVideoFile,
  };
});

export type ServiceInputSchema = z.input<typeof serviceSchema>;
export type ServiceOutputSchema = z.output<typeof serviceSchema>;
export const resolver = zodResolver(serviceSchema);
