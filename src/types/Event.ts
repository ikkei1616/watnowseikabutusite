import { Award } from "@/types/Award";

//Event一覧ページで利用する型定義
export interface Event {
  id: string | null;
  name: string;
  date: string;
  comment?: string;
  image?: string | null;
}

//Event詳細ページで利用する型定義
export interface EventDetail extends Event {
  url?: string;
  location?: string;
  awards: Award[];
}
