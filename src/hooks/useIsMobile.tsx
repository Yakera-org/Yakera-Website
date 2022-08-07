import { useEffect, useState } from "react";

const useIsMobile = (): boolean => {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    setMobile(window.innerWidth < 800);
  }, []);

  return mobile;
};

export default useIsMobile;
