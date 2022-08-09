import axios from "axios";
import { useEffect, useState } from "react";
import LanguageService from "../services/language";

const useLanguageFromGeoLocation = (): string | undefined => {
  const [language, setLanguage] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("https://geolocation-db.com/json/");
        console.log("fetch");
        setLanguage(
          res.data.country_name === "Venezuela" ||
            res.data.country_name === "Argentina" ||
            res.data.country_name === "Colombia" ||
            res.data.country_name === "Chile" ||
            res.data.country_name === "Ecuador" ||
            res.data.country_name === "Mexico" ||
            res.data.country_name === "Mexico" ||
            res.data.country_name === "Peru" ||
            res.data.country_name === "Spain"
            ? "sp"
            : "en"
        );
      } catch {
        setLanguage("en");
      }
    };
    if (!LanguageService.hasLanguageStored()) {
      getData();
    } else {
      setLanguage(LanguageService.getLanguage());
    }
  }, []);
  LanguageService.setLanguageFromIP(language);
  return language ? language : undefined;
};

export default useLanguageFromGeoLocation;
