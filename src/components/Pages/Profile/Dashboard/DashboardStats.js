import React from "react";
import { Grid } from "@material-ui/core";
import "./Dashoard.scss";

function DashboardStats(props) {
  const EN = props.EN;
  const StatDictionary = {
    email: EN ? "Email" : "Email",
    phone: EN ? "Phone Number" : "Teléfono",
    address: EN ? "Address" : "Dirección",
    zelleContact: EN
      ? "Zelle Email or Zelle Phone Number"
      : "Email Zelle o Teléfono Zelle",
    zelleName: EN ? "Zelle Name" : "Zelle Nombre",
    acceptingZelle: EN
      ? "Accepting Zelle Payments?"
      : "¿Aceptando pagos de Zelle?",
    reserveUsername: EN ? "Reserve Username" : "Usuario de Reserve",
  };
  const user = props.user;
  const userStats = {
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    zelleContact: user?.zelleInfo?.email || "",
    zelleName: user?.zelleInfo?.name || "",
    reserveUsername: user.reserveUsername || "",
  };
  return (
    <div className="dashboard-stats">
      <h2>
        {" "}
        {EN ? "Welcome " : "¡Hola "} <span id="orange">{user?.firstName}</span>!
      </h2>

      <Grid container spacing={1} className="dashboard-stats-grid">
        {Object.entries(userStats).map((stat, i) => {
          const [key, value] = stat;
          return (
            <Grid item xs={12} sm={4} key={i}>
              <p>
                <span id={value ? "orange" : "grey"}>
                  {StatDictionary[key]}:
                </span>{" "}
                {value ? (
                  value
                ) : (
                  <span>
                    <a id="grey" href="/profile/edit">
                      {EN ? "missing" : "vacío"}
                    </a>{" "}
                  </span>
                )}
              </p>
            </Grid>
          );
        })}
        <Grid item xs={12} sm={4}>
          <p style={{ marginTop: "-10px" }}>
            <span id="orange">{StatDictionary["acceptingZelle"]}</span>:
            {user.zelleInfo?.isAccepting &&
            userStats.zelleContact &&
            userStats.zelleName ? (
              // on
              <span className="switch" id="on">
                ON
              </span>
            ) : (
              // off
              <span className="switch" id="off">
                OFF
              </span>
            )}
          </p>
        </Grid>
      </Grid>
      <div className="btn-wrapper">
        <button onClick={() => (window.location.href = "/create-campaign")}>
          {EN ? "Create new campaign" : "Crear nueva campaña"}
        </button>
      </div>
    </div>
  );
}

export default DashboardStats;
