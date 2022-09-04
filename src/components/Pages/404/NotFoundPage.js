import React from "react";
import "./404.css";

const url = "https://assets.yakera.org/yakera/404.webp";
function NotFoundPage() {
  return (
    <div className="not-found">
      <img src={url} alt="404" />
    </div>
  );
}

export default NotFoundPage;
