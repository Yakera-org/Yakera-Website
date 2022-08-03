import React from "react";
import { Card } from "@material-ui/core";
import { Progress } from "react-sweet-progress";
import ShareCard from "./ShareCard";

function DonateCard(props) {
  const EN = props.EN;
  const amount = props.amount;
  const target = props.target;
  const isAcceptingZelle = props.isAcceptingZelle;
  return (
    <div>
      <Card
        className="donate-page-card"
        style={{
          borderRadius: "20px",
          backgroundColor: "#f0f0f0",
        }}
      >
        {/* <h1>{EN ? 'Donate now' : 'Done ahora'}</h1> */}
        <div className="donate-page-card-text">
          <p>
            <b>${amount} USD</b>
            &nbsp;
            {EN ? "raised of " : "recaudado de "} ${target} USD{" "}
            {EN ? " target" : ""}
          </p>
        </div>
        <div className="donate-page-card-progress">
          <Progress
            theme={{
              default: {
                trailColor: "lightblue",
                symbol: "",
                color: "#01224d",
              },
            }}
            status="default"
            percent={Math.min((100 * (amount / target)).toFixed(2), 100)}
          />
        </div>

        <div className="donate-page-card-buttons">
          <button
            type="submit"
            className="btn btn-secondary btn-block"
            onClick={() => {
              props.onDonate("donateRef");
            }}
            style={{
              backgroundColor: "#002463",
            }}
          >
            {EN ? "Donate now" : "Done ahora"}
          </button>
          {isAcceptingZelle ? (
            <button
              type="submit"
              className="zelle-button-card"
              onClick={() => {
                props.onDonate("donateRef");
              }}
            >
              {EN ? (
                <>
                  Zelle <span>NEW!</span>
                </>
              ) : (
                <>
                  Zelle <span>¡Nuevo!</span>
                </>
              )}
            </button>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn btn-secondary btn-block"
            onClick={props.onShare}
            style={{
              borderRadius: "20px",
            }}
          >
            {EN ? "Share" : "Compartir"}
          </button>
        </div>
      </Card>

      <ShareCard open={props.showShare} onClose={props.onClose} EN={EN} />
    </div>
  );
}

export default DonateCard;
