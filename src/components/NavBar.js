import React from "react";
import useLanguage from "../hooks/useLanguage.tsx";
import useCurrentTab from "../hooks/useCurrentTab.tsx";
import useCheckAuthenticated from "../hooks/useCheckAuthenticated.tsx";
import "./navbar.scss";

function NavBar() {
  const EN = useLanguage();
  const currentTab = useCurrentTab();
  const isAuthenticated = useCheckAuthenticated();

  const navTabs = [
    "about",
    "campaigns",
    "campaigns",
    "frequently-asked-questions",
    "login",
    isAuthenticated && "profile",
  ];

  return (
    <div className="navbar">
      <div>
        <div className="tabs">
          {navTabs.map((tab) => {
            return (
              <div className="tab">
                <a href={tab}>{tab}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
