import { useEffect, useState } from "react";

const tabMapping = {
  "/": "home",
  "/login": "login",
  "/register": "register",
  "/forgot-password": "login",
  "/about": "about",
  "/create": "profile",
  "/success": "success",
  "/frequently-asked-questions": "frequently-asked-questions",
  "/campaign": "campaigns",
  "/profile": "profile",
};
const useCurrentTab = (): string => {
  const [tab, setTab] = useState("");
  useEffect(() => {
    Object.entries(tabMapping).forEach((entry) => {
      if (document.URL.includes(entry[0])) setTab(entry[1]);
    });
  }, []);
  return tab;
};

export default useCurrentTab;
