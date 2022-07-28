import { useEffect, useState } from "react";

const tabMapping = {
  "/": "home",
  "/login": "login",
  "/register": "login",
  "/forgot-password": "login",
  "/about": "about",
  "/create": "profile",
  "/success": "success",
  "/frequently-asked-questions": "frequently-asked-questions",
  "/campaign": "campaigns",
  "/profile": "profile",
};
const useLanguage = (): string => {
  const [tab, setTab] = useState("");
  useEffect(() => {
    Object.entries(tabMapping).forEach((entry) => {
      if (document.URL.includes(entry[0])) setTab(entry[1]);
    });
  }, []);
  return tab;
};

export default useLanguage;
