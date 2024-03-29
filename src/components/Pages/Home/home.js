import React from "react";
import pics from "./picsHome.json";
import ReactPlayer from "react-player";
import { Grid } from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
import Author from "../../author";
import CampaignCarousel from "./CampaignCarousel";
import Button from "@material-ui/core/Button";
import { CardMedia } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./home.scss";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton.js";
import useLanguage from "../../../hooks/useLanguage";
import useCheckAuthenticated from "../../../hooks/useCheckAuthenticated";

function Home() {
  const targetRef = React.useRef(null);
  const EN = useLanguage();
  const loggedIn = useCheckAuthenticated();

  return (
    <div>
      <div className="home-page">
        <WhatsAppButton EN={EN} targetRef={targetRef} />
        <Grid container spacing={0} style={{ alignItems: "flex-start" }}>
          <Grid item xs={12} sm={6}>
            <section className="top-left">
              <p>
                {EN
                  ? "Change made human, one story at a time."
                  : "Donde la generosidad y las historias se conectan."}
              </p>
              <button>
                {EN ? (
                  <a href="/campaigns">Donate Now!</a>
                ) : (
                  <a href="/create-campaign">Abre mi campaña</a>
                )}
              </button>
            </section>
          </Grid>
          <Grid item xs={12} sm={6}>
            <section className="top-right">
              <img src={pics.phones} alt="phones" />
            </section>
          </Grid>
          <Grid
            container
            className="cta-grid"
            spacing={0}
            style={{
              backgroundColor: "#ffffff",
              marginTop: "30px",
              padding: "30px 0px 30px 0px",
            }}
          >
            <Grid
              container
              className="cta-img-grid"
              item={true}
              xs={12}
              sm={6}
              alignItems="center"
            >
              <section>
                <div className="cta-img" style={{ position: "relative" }}>
                  <CardMedia
                    className="cta-img-card"
                    component="img"
                    image={
                      "https://yakera-files.s3.us-east-2.amazonaws.com/pictures/cta-image.jpeg"
                    }
                    alt="cta-image"
                    style={{ maxWidth: "60%", float: "right" }}
                  />

                  <div className="cta-bubble">
                    <div className="cta-quote">
                      <b>
                        {" "}
                        {EN ? "New Notification!" : "¡Nueva notificaión!"}{" "}
                      </b>{" "}
                      <br />
                      {EN
                        ? "Now you can review your contributions in Yakera!"
                        : "¡Ahora puedes revisar tus aportes en Yakera!"}
                    </div>
                  </div>
                </div>
              </section>
            </Grid>

            <Grid
              container
              xs={12}
              sm={6}
              className="cta-text-grid"
              alignItems="center"
              item={true}
            >
              <section>
                <div className="cta-text-div" style={{ width: "70%" }}>
                  {EN
                    ? "Join the donor hub. Track your impact in a personalized dashboard!"
                    : " Entérate de la importancia que tienen tus contribuciones"}
                  <br />

                  <Button
                    className="cta-text-button"
                    component={Link}
                    to={loggedIn ? "/profile" : "/register"}
                    style={{
                      padding: "10px",
                      margin: "10px",
                      border: "none",
                      backgroundColor: "#ea8737",
                      borderRadius: "30px",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {loggedIn ? (
                      <div>
                        {EN ? "Go to your profile" : "¡Ve a tu perfil!"}
                      </div>
                    ) : (
                      <div>
                        {EN ? "Create your profile" : "¡Ve a tu perfil!"}
                      </div>
                    )}
                  </Button>
                </div>
              </section>
            </Grid>
          </Grid>
          <Grid container spacing={0} className="illustrations-mobile">
            <Grid item xs={12} sm={12}>
              <section>
                {EN ? (
                  <img src={pics["mobile-illustration_alt"]} alt="phones" />
                ) : (
                  <img src={pics["mobile-illustration"]} alt="phones" />
                )}
              </section>
            </Grid>
          </Grid>
          <Grid container spacing={0} className="illustrations">
            {pics.illustrations[EN ? "en" : "es"].map((pic, i) => {
              return (
                <Grid item xs={12} sm={3} key={i}>
                  <img id="illustration" src={pic} alt="illustration" />
                </Grid>
              );
            })}
            <Grid item xs={12} sm={12}>
              <img
                id="dotted-line"
                src={pics["dotted-line"]}
                alt="illustration"
              />
            </Grid>
            {pics["illustration-texts"][EN ? "en" : "es"].map((text, i) => {
              return (
                <Grid item xs={12} sm={3} key={i}>
                  <div
                    id="text"
                    dangerouslySetInnerHTML={{ __html: text }}
                  ></div>
                </Grid>
              );
            })}
          </Grid>

          <Grid container spacing={0} className="video-section">
            <Grid item xs={12} sm={7}>
              <section>
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=nIvkQys-QrM"
                  width="100%"
                  height="500px"
                  playing
                  playIcon={
                    <button id="play-btn">
                      <i className="far fa-play-circle fa-8x"></i>
                    </button>
                  }
                  light={pics["video-img"]}
                />
              </section>
            </Grid>
            <Grid item xs={12} sm={5} className="right-section">
              <section>
                <h3>
                  {EN
                    ? "100% of the donations will reach you quickly and safely."
                    : "El 100% de las donaciones te llegarán de manera rápida y segura."}
                </h3>
                <p>
                  {EN
                    ? "Through a virtual reality experience, you will meet Alexandra from El Calvario, Venezuela. In 360 degrees, find out how Alexandra used Yakera to raise the money necessary to fulfill her dream: to access a quality education."
                    : "A través de una experiencia en realidad virtual, conocerás a Alexandra de El Calvario, Venezuela. En 360 grados, entérate de como Alexandra utilizó Yakera para recaudar el dinero necesario para cumplir su sueño: acceder a una educación de calidad."}
                </p>
              </section>
            </Grid>
          </Grid>
          <Grid container spacing={0} className="carousel-section">
            <CampaignCarousel EN={EN} />
          </Grid>
        </Grid>
        <div ref={targetRef}>
          <Author />
        </div>
      </div>
    </div>
  );
}

export default Home;
