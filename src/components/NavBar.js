import React from "react";
import useLanguage from "../hooks/useLanguage.tsx";
import useCurrentTab from "../hooks/useCurrentTab.tsx";
import useCheckAuthenticated from "../hooks/useCheckAuthenticated.tsx";
import "./navbar.scss";
import TokenService from "../services/token";
import api from "../services/api";
import LanguageService from "../services/language";

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
    logout: EN ? "SIGN OUT" : "CERRAR SESIÓN",
    profile: isDonor ? EN && "DONOR HUB" : EN ? "DASHBOARD" : "MI CUENTA",
  };

  const onLogOut = async () => {
    try {
      await api.post("/auth/logout");
      window.alert(
        EN ? "User logged out successfully!" : "¡Cierre de sesión con éxito!"
      );
    } finally {
      TokenService.removeAccessToken();
      TokenService.removeRefreshToken();
      localStorage.removeItem("userType");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      window.location.href = "/";
    }
  };

  const onLanguage = () => {
    LanguageService.setLanguage();
    window.location.reload(false);
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
        <div className="tab language-switch">
          <input
            type="checkbox"
            id="switch"
            class="checkbox"
            onChange={onLanguage}
            checked={EN}
          />
          <label for="switch" class="toggle"></label>
        </div>
      </div>
      {isAuthenticated && (
        <div className="tab logout" onClick={onLogOut}>
          <i className="fas fa-sign-out-alt"></i>
          {tabDictionary["logout"]}
        </div>
      )}
    </div>
  );
}

export default NavBar;
