import React, { useState } from "react";
import useLanguage from "../hooks/useLanguage.tsx";
import useCurrentTab from "../hooks/useCurrentTab.tsx";
import useCheckAuthenticated from "../hooks/useCheckAuthenticated.tsx";
import "./navbar.scss";
import "./navbar-mobile.scss";
import TokenService from "../services/token";
import api from "../services/api";
import LanguageService from "../services/language";
import Switch from "react-switch";
import ReactCountryFlag from "react-country-flag";
import useIsMobile from "../hooks/useIsMobile";

const yakeraLogo = "https://assets.yakera.org/yakera/logo.svg";
const yakeraLogoMobile = "https://assets.yakera.org/yakera/y.webp";

function NavBar() {
  const isMobile = useIsMobile();
  const EN = useLanguage();
  const currentTab = useCurrentTab();
  const isAuthenticated = useCheckAuthenticated();
  const isDonor = TokenService.isDonor();

  const [openMenu, setOpenMenu] = useState(false);

  const navTabs = [
    "about",
    "campaigns",
    "frequently-asked-questions",
    isAuthenticated ? "profile" : "login",
  ];

  const tabDictionary = {
    about: EN ? "ABOUT US" : "SOBRE NOSOTROS",
    campaigns: EN ? "CAMPAIGNS" : "CAMPAÑAS",
    "frequently-asked-questions": EN ? "FAQ" : "PREGUNTAS",
    login: EN ? "LOG IN" : "INICIAR SESIÓN",
    register: EN ? "REGISTER" : "REGISTRAR",
    logout: EN ? "SIGN OUT" : "CERRAR SESIÓN",
    profile: isDonor ? "DONOR HUB" : EN ? "DASHBOARD" : "MI CUENTA",
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
    <>
      {!isMobile ? (
        <div className="nav-bar">
          <div className="tabs">
            <div className="active-tabs">
              <a href="/" className="brand-wrapper">
                <img src={yakeraLogo} alt="yakera-brand-logo" />
              </a>
              {navTabs
                .filter((t) => t !== "" && typeof t === "string")
                .map((tab, i) => {
                  return (
                    <div
                      key={i}
                      className={`tab ${
                        tab === "login" || tab === "profile"
                          ? "login-tab"
                          : undefined
                      }`}
                      style={
                        tab === currentTab ? { borderColor: "#eb913b" } : {}
                      }
                      onClick={
                        tab === "login" || tab === "profile"
                          ? () => {
                              window.location.href = `/${tab}`;
                            }
                          : undefined
                      }
                    >
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
                <LanguageSwitch onChange={onLanguage} EN={EN} />
              </div>
            </div>
            {isAuthenticated && (
              <div className="tab logout" onClick={onLogOut}>
                <i className="fas fa-sign-out-alt"></i>
                {window.innerWidth > 900 && tabDictionary["logout"]}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className={`nav-bar-mobile`}>
            <a href="/" className="brand-wrapper tab">
              <img src={yakeraLogoMobile} alt="yakera-brand-logo" />
            </a>
            <div
              className="hamburger tab"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <i className="fas fa-2x fa-bars"></i>
            </div>
          </div>
          {openMenu && (
            <Menu
              navTabs={navTabs}
              currentTab={currentTab}
              tabDictionary={tabDictionary}
              onLanguage={onLanguage}
              EN={EN}
              isAuthenticated={isAuthenticated}
              onLogOut={onLogOut}
            />
          )}
        </>
      )}
    </>
  );
}

export default NavBar;

function LanguageSwitch(props) {
  return (
    <Switch
      onChange={props.onChange}
      checked={props.EN}
      handleDiameter={20}
      offColor="#eeeeee"
      onColor="#eeeeee"
      offHandleColor="#01224d"
      onHandleColor="#01224d"
      height={50}
      width={100}
      borderRadius={5}
      uncheckedIcon={
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <ReactCountryFlag
            countryCode="VE"
            svg
            title="VE"
            style={{
              width: "65%",
              height: "auto",
              borderRadius: "5px",
            }}
          />
        </div>
      }
      checkedIcon={
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <ReactCountryFlag
            countryCode="US"
            svg
            title="US"
            style={{
              width: "65%",
              height: "auto",
              borderRadius: "5px",
            }}
          />
        </div>
      }
    />
  );
}

function Menu(props) {
  return (
    <div className="menu-overlay">
      {props.navTabs
        .filter((t) => t !== "" && typeof t === "string")
        .map((item, i) => {
          return (
            <div key={i} className={`item`}>
              <a
                id={props.currentTab === item ? "current" : undefined}
                href={`/${item}`}
              >
                {props.tabDictionary[item]}
              </a>
            </div>
          );
        })}
      {props.isAuthenticated && (
        <div className="item logout" onClick={props.onLogOut}>
          <i className="fas fa-sign-out-alt"></i>
          {" " + props.tabDictionary["logout"]}
        </div>
      )}
      <div className="item language-switch">
        <LanguageSwitch onChange={props.onLanguage} EN={props.EN} />
      </div>
    </div>
  );
}
