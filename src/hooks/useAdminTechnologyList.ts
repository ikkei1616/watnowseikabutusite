import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import type Technology from "@/types/Technology";

const useAdminTechnologyList = () => {
  const [technologies, setTechnologies] = useState<Technology[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      setError(null);
      setTechnologies(null);
      setLoading(true);

      const { data, error } = await supabase
        .from("technologies")
        .select("id, name, image")
        .order("name", { ascending: true });

      //取得に関するエラーハンドリング
      if (error) {
        console.error("Error fetching technologies:", error);
        setError(error.message);
      } else {
        if (data === null) {
          console.error("No data fetched");
          setTechnologies(null);
          return;
        }
        const fetchedTechnologies: Technology[] = data.map((technology) => {
          return {
            id: technology.id,
            name: technology.name,
            imagePath: technology.image,
          };
        });
        setTechnologies(fetchedTechnologies || []); // データがnullのときの対策として空配列を設定
      }
      setLoading(false);
    };

    fetchTechnologies();
  }, []);

  return { technologies, loading, error };
};

export default useAdminTechnologyList;
