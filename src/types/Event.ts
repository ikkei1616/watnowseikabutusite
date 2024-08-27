import { Award } from ".//Award";

//Event一覧ページで利用する型定義
export interface Event {
  id: string | null;
  name: string;
  date?: string;
  comment?: string;
}

//Event詳細ページで利用する型定義
export interface EventDetail extends Event {
  url?: string;
  awards: Award[];
}
