import { useEffect, useState } from "react";

const useSplashScreen = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
};

export default useSplashScreen;
