import React from "react";
import { Card } from "@material-ui/core";

function AuthBadge(props) {
  const EN = props.EN;
  return (
    <div>
      <Card
        className="auth-badge"
        style={{
          borderRadius: "25px",
          backgroundColor: "#f0f0f0",
        }}
        elevation={0}
      >
        <div className="auth-badge-div">
          <p className="auth-badge-content">
            {EN ? "This campaign is verified " : "Yakera ha verificado "}
            <span className="nobreak-wrap">
              {EN ? "by Yakera" : "esta campaña"}&nbsp;
              <img
                className="auth-badge-icon"
                alt=""
                src={"https://assets.yakera.org/yakera/authbadge.webp"}
              />
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default AuthBadge;
