import React from "react";
import useLanguage from "../../../hooks/useLanguage.tsx";
import Author from "../../author";
import "./AboutUs.css";
import AboutUsVisuals from "./AboutUsVisuals";

function AboutUs() {
  const EN = useLanguage();
  return (
    <div className="about-us-page">
      <AboutUsVisuals EN={EN} />
      <Author />
    </div>
  );
}

export default AboutUs;
