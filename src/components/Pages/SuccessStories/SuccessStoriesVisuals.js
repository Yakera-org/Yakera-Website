import React from "react";
import useLanguage from "../../../hooks/useLanguage.tsx";
import "./SuccessStories.scss";

function SuccessStoriesVisuals(props) {
  const EN = useLanguage();

  return (
    <div className="success-page">
      <div>{EN ? "Success Page" : "In spanish"}</div>
    </div>
  );
}

export default SuccessStoriesVisuals;
