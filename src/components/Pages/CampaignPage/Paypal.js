import React from "react";
import ReactDOM from "react-dom"
import { PayPalButton } from "react-paypal-button-v2";


//sb-hokue3829590@personal.example.com
//H90%eGiD

class PayPal extends React.Component {
    render() {
        const { amount, onSuccess, currency } = this.props;
          return (
              <PayPalButton
                amount={amount}
                currency="USD"
                intent="Yakera transaction"
                onSuccess={(details, data) => onSuccess(details, data)}
                
                style={{
                    layout:  'vertical',
                    color:   'gold',
                    shape:   'rect',
                    label:   'paypal'
                }}
            />
          );
      }
}

export default PayPal;