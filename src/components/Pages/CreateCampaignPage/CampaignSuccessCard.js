import React from "react";
import { Dialog } from "@material-ui/core";

const campaignSuccess =
  "https://assets.yakera.org/yakera/campaign-success.webp";

function SuccessCard(props) {
  const EN = props.EN;
  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={props.open}
        onClose={props.onClose}
      >
        <div className="col success-card">
          <h1>{EN ? "Request sent!" : "¡Solicitud enviada!"}</h1>
          {props.isMobile ? (
            <>
              <div className="success-line"></div>
              <p>
                {EN
                  ? "We review campaigns from 9 am - 5 pm on weekdays. If we need more information to publish it, you will receive a direct message from our team."
                  : "Revisamos las campañas desde 9 am - 5 pm durante días laborables. Si necesitamos más información para publicarla recibirás un mensaje directo de parte de nuestro equipo."}
              </p>
              <button>{EN ? "Ok" : "Entendido"}</button>
            </>
          ) : (
            <div className="row">
              <img
                src={campaignSuccess}
                alt="Success"
                className="success-card-img"
              />
              <div className="col">
                <p>
                  {EN
                    ? "We review campaigns from 9 am - 5 pm on weekdays. If we need more information to publish it, you will receive a direct message from our team."
                    : "Revisamos las campañas desde 9 am - 5 pm durante días laborables. Si necesitamos más información para publicarla recibirás un mensaje directo de parte de nuestro equipo."}
                </p>
                <button onClick={props.onClose}>
                  {EN ? "Ok" : "Entendido"}
                </button>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default SuccessCard;
