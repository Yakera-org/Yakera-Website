import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import Environment from '../../../services/Environment';

class PayPal extends Component {
    render() {
        const { amount, onSuccess, onError, onCancel, onClick } = this.props;

        return (
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
                    disableFunding: 'credit,card',
                    // Debug and testing only
                    // buyerCountry: 'US',
                    // debug: true,
                }}
            />
        );
    }
}

export default PayPal;
