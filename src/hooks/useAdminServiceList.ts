import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import type { AdminServiceList } from "@/types/Service";

const useAdminServiceList = (selectedYear: number) => {
  const [services, setServices] = useState<AdminServiceList[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, release_year")
        .eq("release_year", selectedYear)
        .order("release_year", { ascending: true });

      //取得に関するエラーハンドリング
      if (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } else {
        if (data === null) {
          return;
        }
        const fetchedServices: AdminServiceList[] = data.map((service) => {
          return {
            id: service.id,
            name: service.name,
            year: service.release_year,
          };
        });
        setServices(fetchedServices || []); // データがnullのときの対策として空配列を設定
      }
    };

    fetchServices();
  }, [selectedYear]);

  return { services, error };
};

export default useAdminServiceList;
