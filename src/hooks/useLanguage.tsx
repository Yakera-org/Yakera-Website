import { useEffect, useState } from "react";
import LanguageService from "../services/language";

const useLanguage = (): boolean => {
  const [EN, setEN] = useState(false);
  useEffect(() => {
    setEN(LanguageService.getLanguage() === "en");
  }, []);
  return EN;
};

export default useLanguage;
