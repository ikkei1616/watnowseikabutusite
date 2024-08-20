//Event一覧ページで利用する型定義
export interface Event {
    id: string; 
    name: string;
    date: string;
    comment: string;
}

//Event詳細ページで利用する型定義
export interface EventDetail{
    id: string
    name: string
    date: string
    comment: string
    url: string
}