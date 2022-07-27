import { useEffect, useState } from "react";

const tabMapping = {
  "/": "home",
  "/login": "login",
  "/register": "login",
  "/about": "about",
  "/create": "create",
  "/success": "success",
  "/frequently-asked-questions": "FAQ",
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
