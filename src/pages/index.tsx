import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/pollingBooth/languageSelection");
  }, [router]);

  return null;
};

export default Home;