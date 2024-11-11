import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import type { Event } from "@/types/Event";

const useAdminEventList = (selectedYear: number) => {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setError(null);
      setEvents(null);

      // 年と月順でデータを取得
      const { data, error } = await supabase
        .from("events")
        .select("id, name, year, month")
        .eq("year", selectedYear)
        .order("month", { ascending: true });

      //取得に関するエラーハンドリング
      if (error) {
        console.error("Error fetching events:", error);
        setError(error.message);
      } else {
        if (data === null) {
          setEvents([]);
          return;
        }
        console.log("Fetched data:", data); // デバッグ用に取得データを出力
        setEvents((data as Event[]) || []); // データがnullのときの対策として空配列を設定
      }
    };

    fetchEvents();
  }, [selectedYear]);

  return { events, error };
};

export default useAdminEventList;
