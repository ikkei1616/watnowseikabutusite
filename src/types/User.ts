import { Service } from "./Service";
import type Technology from "./Technology";

//Eventの型定義
export default interface User {
  id: string;
  accountID: string;
  nickname: string;
  image?: string;
}

export interface UserDetail extends User {
  name: string;
  introduction?: string;
  technologies: Technology[];
  githubID?: string;
  xID?: string;
  instagramID?: string;
  services: Service[];
  isVisible: boolean;
}
export interface CreatorUser
  extends Pick<
    UserDetail,
    "accountID" | "nickname" | "image" | "technologies"
  > {}

export interface AdminUserList {
  id: string;
  name: string;
  nickname: string;
}
