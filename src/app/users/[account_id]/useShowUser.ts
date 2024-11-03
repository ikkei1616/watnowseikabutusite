import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import type User from "@/types/User";
import type Technology from "@/types/Technology";
import useStorage from "@/hooks/useStorage";
import { ImageType } from "@/types/ImageType";

const useShowUser = (accountID: string) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userIconURL, setUserIconURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchImageURL = useStorage();
  console.log(userData);

  useEffect(() => {
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

        const fetchedURL = await fetchImageURL(data?.id, ImageType.USER_ICONS);
        setUserIconURL(fetchedURL);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { userData, userIconURL, loading };
};

export default useShowUser;
