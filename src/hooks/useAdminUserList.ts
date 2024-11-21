import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import type { AdminUserList } from "@/types/User";

const useAdminUserList = () => {
  const [users, setUsers] = useState<AdminUserList[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setError(null);
      setUsers(null);
      setLoading(true);

      const { data, error } = await supabase
        .from("users")
        .select("id, name, nickname")
        .order("name", { ascending: true });

      //取得に関するエラーハンドリング
      if (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } else {
        if (data === null) {
          console.error("No data fetched");
          setUsers(null);
          return;
        }
        const fetchedUsers: AdminUserList[] = data.map((user) => {
          return {
            id: user.id,
            name: user.name,
            nickname: user.nickname,
          };
        });
        setUsers(fetchedUsers || []); // データがnullのときの対策として空配列を設定
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export default useAdminUserList;
