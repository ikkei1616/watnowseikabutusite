import { Award, AwardDetail } from "@/types/Award";

//Event一覧ページで利用する型定義
export interface Event {
  id: string | null;
  name: string;
  year: number;
  month: number;
  comment?: string;
  image?: string | null;
}

//Event詳細ページで利用する型定義
export interface EventDetail extends Event {
  url?: string;
  location?: string;
}

export interface AdminEventDetail extends Event {
  url?: string;
  location?: string;
  awards: AwardDetail[];
}

//Eventの全てのプロダクトページで利用する型定義
export interface EventName {
  name:string;
}