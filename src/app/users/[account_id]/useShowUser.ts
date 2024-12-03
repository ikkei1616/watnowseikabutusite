import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import type { UserDetail } from "@/types/User";
import type Technology from "@/types/Technology";

interface fetchService {
  service_id: {
    id: string;
    name: string;
    image: string;
  };
}

const useShowUser = (accountID: string) => {
  const [userData, setUserData] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from("users")
        .select(
          `
        *,
        github(github_id),
        x(x_id),
        instagram(instagram_id),
        users_servicies(service_id(id, name, image)),
        users_technologies(technology_id(id, name, image))
        `
        )
        .eq("account_id", accountID)
        .single();

      console.log(data);
      if (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } else {
        setUserData({
          id: data?.id,
          accountID: data?.account_id,
          name: data?.name,
          nickname: data?.nickname,
          image: data?.image,
          introduction: data?.introduction || "",
          technologies:
            data?.users_technologies.map(
              (users_technology: { technology_id: Technology }) =>
                users_technology.technology_id
            ) || [],
          githubID: data?.github?.github_id,
          xID: data?.x?.x_id,
          instagramID: data?.instagram?.instagram_id,
          services: data?.users_servicies.map(
            (users_service: fetchService) =>
              ({
                id: users_service.service_id.id,
                name: users_service.service_id.name,
                image: users_service.service_id.image,
              })
          ),
          isVisible: data?.is_visible,
        } as UserDetail);
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { userData, loading };
};

export default useShowUser;
