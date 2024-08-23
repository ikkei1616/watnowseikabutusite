import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const serviceSchema = z.object({
    serviceName: z.string().min(1,"サービス名は必須です"),
    description: z.string(),
    teamName: z.string(),
    serviceImage: z.nullable(z.instanceof(FileList)),
    award: z.string(),
    selectEvent: z.string(),
    serviceDetail: z.string(),
    developmentPeriodNum: z.number({invalid_type_error: "数値を入力してください"}).positive().int(),
    developmentPeriod: z.string(),
})
.transform(x =>{
  const image = x.serviceImage?.item(0);
  return {
    ...x,
    image,
  }

})

export type ServiceInputSchema = z.input<typeof serviceSchema>;
export type ServiceOutputSchema = z.output<typeof serviceSchema>;
export const resolver = zodResolver(serviceSchema);
