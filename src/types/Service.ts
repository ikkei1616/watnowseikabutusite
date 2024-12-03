
import { Award } from "@/types/Award";
import { ReactNode } from "react";

//Service一覧ページで利用する型定義
export interface Service {
  id: string | null;
  name: string;
  image: string;
  description?: string;
  comment?: string;
  award_id: string;
}

export interface EventAllService {
  id: string | null;
  name: string;
  image: string;
  description?: string;
  comment?: string;
  award_id: string;
  awards: {id:string,name:string};
}

//Service詳細ページで利用する型定義
export interface ServiceDetail extends Service {
  github_url: string | undefined;
  url: string | undefined;
  tech_stack: string | undefined;
  release_month: ReactNode;
  release_year: ReactNode;
  image: string;
  description?: string;
  team_name: string;
  create_date?: string;
  awards: Award[];
}

export interface AdminServiceList {
  id: string;
  name: string;
  year: number;
}