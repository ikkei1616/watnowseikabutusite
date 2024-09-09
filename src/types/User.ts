import type Technology from "./Technology";

//Eventの型定義
export default interface User {
    id: string;
    accountID: string;
    name: string;
    nickname: string;
    introduction?: string;
    technologies: Technology[];
}
