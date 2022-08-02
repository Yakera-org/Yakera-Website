import { useEffect, useState } from "react";
import TokenService from "../services/token";

const useLanguage = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (TokenService.getLocalAccessToken()) setIsAuthenticated(true);
  }, []);
  return isAuthenticated;
};

export default useLanguage;
