import { useEffect, useState } from "react";

const useIsMobile = (): boolean => {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  return mobile;
};

export default useIsMobile;
