
import { Award } from "@/types/Award";
import Technology from "./Technology";
import {Event} from "./Event";
import { CreatorUser } from "./User";

//Service一覧ページで利用する型定義
export interface Service {
  id: string | null;
  name: string;
  image: string;
  description?: string;
  comment?: string;
  award_id?: string;
  awards?: Award;
}

export interface EventAllService {
  id: string | null;
  name: string;
  image: string;
  description?: string;
  comment?: string;
  award_id: string;
  awards?: {id:string,name:string};
}

//Service詳細ページで利用する型定義
export interface ServiceDetail extends Service {
  techStack: Technology[];
  event: Event;
  releaseMonth?: string
  releaseYear?: string;
  description?: string;
  teamName?: string;
  developmentPeriod?: string;
  creators: CreatorUser[];
  awardName?: string;
  urlWebsite?: string;
  urlAppStore?: string;
  urlGooglePlay?: string;
  urlOthers?: string;
}

export interface AdminServiceList {
  id: string;
  name: string;
  year: number;
}