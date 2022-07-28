import React from "react";
import useLanguage from "../hooks/useLanguage.tsx";
import useCurrentTab from "../hooks/useCurrentTab.tsx";
import useCheckAuthenticated from "../hooks/useCheckAuthenticated.tsx";
import "./navbar.scss";
import TokenService from "../services/token";

const yakeraLogo = "https://assets.yakera.org/yakera/logo.svg";

function NavBar() {
  const EN = useLanguage();
  const currentTab = useCurrentTab();
  const isAuthenticated = useCheckAuthenticated();
  const isDonor = TokenService.isDonor();

  const navTabs = [
    "about",
    "campaigns",
    "frequently-asked-questions",
    !isAuthenticated && "login",
    isAuthenticated && "profile",
  ];

  const tabDictionary = {
    about: EN ? "ABOUT US" : "SOBRE NOSOTROS",
    campaigns: EN ? "CAMPAIGNS" : "CAMPAÑAS",
    "frequently-asked-questions": EN ? "FAQ" : "PREGUNTAS",
    login: EN ? "LOG IN" : "INICIAR SESIÓN",
    profile: isDonor ? EN && "DONOR HUB" : EN ? "DASHBOARD" : "MI CUENTA",
  };

  return (
    <div className="navbar">
      <div className="tabs">
        <a href="/" className="brand-wrapper">
          <img src={yakeraLogo} alt="yakera-brand-logo" />
        </a>
        {navTabs
          .filter((t) => t !== "" && typeof t === "string")
          .map((tab, i) => {
            return (
              <div key={i} className="tab">
                <a
                  id={currentTab === tab ? "current" : undefined}
                  href={`/${tab}`}
                >
                  {tabDictionary[tab]}
                </a>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default NavBar;
