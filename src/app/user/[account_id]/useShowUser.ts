import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import type User from "@/types/User";
import type Technology from "@/types/Technology";

const useShowUser = (accountID: string) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userIconUrl, setUserIconUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(userData);

  useEffect(() => {
    const fetchUserIcons = async (id: string) => {
      const extensions = ["JPG", "jpg", "jpeg", "png", "gif"];
      let imageUrl = null;

      for (const ext of extensions) {
        const { data } = supabase.storage
          .from("user_icons")
          .getPublicUrl(`${id}.${ext}`);
        if (data?.publicUrl) {
          imageUrl = data.publicUrl;
          break;
        }
      }
      return imageUrl;
    };

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          `
        *,
        users_technologies(technology_id(id, name))
        `
        )
        .eq("account_id", accountID)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } else {
        setUserData({
          id: data?.id,
          accountID: data?.account_id,
          name: data?.name,
          nickname: data?.nickname,
          introduction: data?.introduction || "",
          technologies:
            data?.users_technologies.map(
              (users_technology: { technology_id: Technology }) =>
                users_technology.technology_id
            ) || [],
        } as User);

        const fetchedURL = await fetchUserIcons(data?.id);
        setUserIconUrl(fetchedURL);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { userData, userIconUrl, loading };
};

export default useShowUser;