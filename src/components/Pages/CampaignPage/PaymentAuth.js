import React, { useState, useEffect } from 'react';
import {Card} from '@material-ui/core';
import PayPal from './Paypal';
import airtmLogo from '../../../pics/airtmbutton.png';
import zelleLogo from '../../../pics/zelle.png';
import ZelleLogic from './ZelleLogic';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import StripeForm from './Stripe';

// The public key is currently set to the test public key
const PUBLIC_KEY = "pk_test_51KjTNTD1ctBA5rzvPq6FjtoOxn2bGAPvUX5GluRXOUnaMrINHjQ55uC3ZqllRDaUcoTAITPjPlvT76cNjNlZAPTM00Y71uOjrE";
const stripePromise = loadStripe(PUBLIC_KEY);

function PaymentAuth(props) {
    const EN = props.EN
    const [openZelle, setOpenZelle] = React.useState(false);
    
    const shouldShowZelle = props?.isAcceptingZelle;


    function onAirTM(){
        props.onAirTM(total_amount, props.title, props.name, props.email)
    }
    async function onZelle(){
        setOpenZelle(!openZelle)
    }

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create payment intent
        // Change fetch call to axios
        fetch("/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "donation", quantity: this.amount },
                                           { id: "tip", quantity: this.tip }] }),
        }).then((res) => res.json()).then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#eb913b",
            colorBackground: "#f0f0f0",
            colorText: "#ffffff",
            colorDanger: "#c90003",
            fontFamily: "Ramona-Bold, Ramona-Light, Intro-Regular-Alt, Intro-Thin, Intro-Light",
        }
    };

    const options = {
        clientSecret,
        appearance,
    };

    const total_amount = parseInt(props.amount) + parseInt(props.tip)
    return (
        <div>
             <p>{EN ? 'Payment Authentication' : 'Autenticación de pago'}</p>
            <Card className='payment-auth-card'>

                <div className='auth-axplanation'>
                    <h4>
                    {EN ? 'Amount to be donated:' : 'Monto a donar:'} <label style={{color:'#ea8737'}}>{total_amount} $ </label>
                    </h4>
                    <p>{EN ? 'Please select a payment method' : 'Por favor seleccione un método de pago.'}</p>
                </div>
                <PayPal
                    amount={total_amount}
                    onSuccess={props.OnSuccessPayment}
                    onClick={props.OnPaymentClick}
                    onError={props.OnPaymentError}
                    onCancel={props.OnPaymentCancel}
                />
                <button
                    type="submit"
                    onClick={onAirTM}
                    className=" airtm-but"

                >
                    <img src={airtmLogo} alt="airtm-logo-button" />
                </button>
                { shouldShowZelle
                ?
                <div >
                    <button
                        type="submit"
                        className=" airtm-but"
                        onClick={onZelle}
                    >
                        <img src={zelleLogo} alt="zelle-logo-button" />
                    </button>
                    {
                        openZelle
                        ?
                        <ZelleLogic
                            EN={EN}
                            slug={props.slug}
                            email={props.email}
                            name={props.name}
                            amount={props.amount}
                            tip={props.tip}
                            comment={props.comment}
                            isAnon={props.isAnon}
                            openThanks={props.openThanks}
                            recipientName={props.recipientName}
                            recipientEmail={props.recipientEmail}
                        />
                        :
                        ''
                    }
                </div>
                :
                ''
                }
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <StripeForm />
                    </Elements>
                )}


            <button className='payment-back-btn' onClick={props.onBack}>
                {EN ? 'Return' : 'Regreso'}
            </button>
            </Card>
        </div>
    )
}

export default PaymentAuth
