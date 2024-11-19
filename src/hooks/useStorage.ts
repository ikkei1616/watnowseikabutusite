import { supabase } from "@/supabase/supabase";
import type { ImageType } from "@/types/ImageType";

const useStorage = () => {
  const fetchImageURL = async (id: string, type: ImageType) => {
    const extensions = ["JPG", "jpg", "jpeg", "png", "gif"];
    let imageUrl = null;

    for (const ext of extensions) {
      const { data } = supabase.storage.from(type).getPublicUrl(`${id}.${ext}`);
      if (data?.publicUrl) {
        return data.publicUrl;
      }
    }
    return imageUrl;
  };

  return fetchImageURL;
};

export default useStorage;
