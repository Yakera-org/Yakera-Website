import React, { Component } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import Environment from "../../../services/Environment";
import "./Paypal.css";

class PayPal extends Component {
  render() {
    const { EN, amount, onSuccess, onError, onCancel, onClick } = this.props;

    return (
      <>
        <p className="paypal-text">
          {EN ? "Amount to be donated via " : "Cantidad a donar vía "}
          <span>
            Pay<span>Pal</span>
          </span>
          : ${amount} USD
        </p>
        <div className="card-notice">
          {EN
          ?
          'At this time we cannot accept US-based debit or credit cards. If you have a card from the US, please use another card or payment method to complete your contribution. Thank you!'
          :
          'En este momento no podemos aceptar tarjetas de débito o crédito basadas en EE.UU. Si tiene una tarjeta de los EE.UU., por favor utilice otra tarjeta o método de pago para completar su contribución. ¡Gracias!'
          }
        </div>
        <PayPalButton
          amount={amount}
          currency={"USD"}
          intent={"Yakera transaction"}
          onSuccess={(details, data) => onSuccess(details, data)}
          catchError={onError}
          onCancel={onCancel}
          onClick={onClick}
          style={{
            layout: "vertical",
            color: "white",
            shape: "rect",
            label: "paypal",
          }}
          options={{
            clientId: Environment.getPayPalClientID(),
            currency: "USD",
            disableFunding: "card", // 'credit,card' to disable more options
            // Debug and testing only
            // buyerCountry: 'US',
            // debug: true,
          }}
        />
      </>
    );
  }
}

export default PayPal;
