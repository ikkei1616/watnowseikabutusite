import { Award } from "@/types/Award";
import { ReactNode } from "react";

//Service一覧ページで利用する型定義
export interface Service {
  id: string | null;
  name: string;
  comment?: string;
}

//Service詳細ページで利用する型定義
export interface ServiceDetail extends Service {
  release_month: ReactNode;
  release_year: ReactNode;
  image: any;
  description?: string;
  team_name: string;
  create_date?: string;
  awards: Award[];
}
