import type { EventDetail } from "./Event";

export type EventFormProps = {
  initialEvent?: EventDetail;
  isEditing: boolean; //新規イベント作成ページなのか編集ページを管理
  onSuccess: () => void;
};
