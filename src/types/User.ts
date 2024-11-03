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
    isVisible: boolean;
}