import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import { Dialog, Grid, Hidden } from "@material-ui/core";
import useCheckAuthenticated from "../../../hooks/useCheckAuthenticated.tsx";
import { Link } from "react-router-dom";

function ThanksCard(props) {
  const loggedIn = useCheckAuthenticated();
  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={props.open}
        onClose={props.onClose}
        className="thanks-dialog"
      >
        <div style={{ backgroundColor: "#fbefe2" }}>
          <div
            className="close-icon"
            onClick={props.onClose}
            style={{ color: "#252525", float: "right" }}
          >
            <i className="fas fa-2x fa-times"></i>
          </div>
        </div>

        <Grid container spacing={0} bgcolor="#fbefe2" className="thanks-grid">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "30vh" }}
            sm={6}
            item={true}
          >
            <div>
              <h1 style={{ marginTop: "10px", color: "#ea8737" }}>
                {" "}
                {props.EN ? <b>Thank you!</b> : <b>Gracias!</b>}
              </h1>
              <br />
              <p style={{ color: "#ea8737" }}>
                {props.EN ? (
                  <div>
                    Yakera means gratitude in Warao,
                    <br /> and we send you gratitude!
                  </div>
                ) : (
                  <div>
                    Yakera significa gratitud en warao,
                    <br /> y te mandamos nuestra Yakera
                  </div>
                )}
              </p>

              <hr width="50%" color="#ea8737" />

              <p>
                {props.EN
                  ? "Thank you for your donation of "
                  : "Gracias por tu donación de "}
                <b>${props.amount} USD</b>
                {props.EN ? " to the campaign: " : " a la campaña: "} <br />
                <b style={{ fontSize: "23px" }}>{props.title} </b>
              </p>

              <a
                href="https://form.jotform.com/212647238863160"
                title="Feedback"
              >
                <br />
                {props.EN ? (
                  <b style={{ color: "#ea8737" }}>
                    Click here to leave us feedback!{" "}
                  </b>
                ) : (
                  <b style={{ color: "#ea8737" }}>
                    Haz click aquí para dejarnos tu feedback!{" "}
                  </b>
                )}
              </a>
              <br />
              <br />

              {loggedIn && (
                <Button
                  className="thanks-button"
                  component={Link}
                  to="/register"
                  style={{
                    margin: "10px",
                    width: "70%",
                    border: "none",
                    backgroundColor: "#ea8737",
                    borderRadius: "30px",
                    color: "white",
                    padding: "10px",
                    fontSize: "13px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Intro-Regular-Alt",
                      fontSize: "13px",
                    }}
                  >
                    {props.EN
                      ? "Create a donor account"
                      : "Crea tu cuenta de donante"}
                  </div>
                </Button>
              )}
            </div>
          </Grid>
          <Hidden xsDown>
            <Grid
              container
              spacing={0}
              // direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "50vh" }}
              sm={6}
              item={true}
            >
              <img
                src="https://assets.yakera.org/yakera/illustration-share.webp"
                alt="gratitudImage"
                width="90%"
              />
            </Grid>
          </Hidden>
        </Grid>
      </Dialog>
    </Fragment>
  );
}

export default ThanksCard;
