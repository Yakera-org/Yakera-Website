import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
class PayPal extends React.Component {
    render() {
        const { amount, onSuccess, onError, onCancel, onClick } = this.props;
        return (
            <PayPalButton
                amount={amount}
                currency="USD"
                intent="Yakera transaction"
                onSuccess={(details, data) => onSuccess(details, data)}
                catchError={onError}
                onCancel={onCancel}
                onClick={onClick}
                
                style={{
                    layout:  'vertical',
                    color:   'white',
                    shape:   'rect',
                    label:   'paypal'
                }}
            />
          );
      }
}

export default PayPal;