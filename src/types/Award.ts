//賞に関する型定義
export interface Award {
  id: string;
  name: string;
}

export interface AwardDetail {
  order_num: string | null;
  name: string;
}
