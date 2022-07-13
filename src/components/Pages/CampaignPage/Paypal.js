import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import Environment from '../../../services/Environment';
import './Paypal.css';

class PayPal extends Component {
    render() {
        const { EN, amount, onSuccess, onError, onCancel, onClick } = this.props;

        return (
            <>
                <p className="paypal-text">
                    {EN ? 'Amount to be donated via ' : 'Cantidad a donar vía '}
                    <span>Pay<span>Pal</span></span>: ${amount}
                </p>
                <PayPalButton 
                    amount={amount}
                    currency={'USD'}
                    intent={'Yakera transaction'}
                    onSuccess={(details, data) => onSuccess(details, data)}
                    catchError={onError}
                    onCancel={onCancel}
                    onClick={onClick}

                    style={{
                        layout: 'vertical',
                        color: 'white',
                        shape: 'rect',
                        label: 'paypal',
                    }}

                    options={{
                        clientId: Environment.getPayPalClientID(),
                        currency: 'USD',
                        disableFunding: 'card',  // 'credit,card' to disable more options
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
