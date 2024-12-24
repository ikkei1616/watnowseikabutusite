"use client";
import SplashScreen from "@/components/SplashScreen";
import useSplashScreen from "@/hooks/useSplashScreen";

export default function Home() {
  const { isMounted } = useSplashScreen();

  return <>{isMounted && <SplashScreen />}</>;
  
}
