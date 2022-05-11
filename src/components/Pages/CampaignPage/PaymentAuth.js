import React, { useState, useEffect } from 'react';
import {Card} from '@material-ui/core';

import ZelleLogic from './ZelleLogic';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import StripeForm from './Stripe';
import api from '../../../services/api';
import { Accordion, Card as AccordionCard } from 'react-bootstrap';

// test key: "pk_test_51KjTNTD1ctBA5rzvPq6FjtoOxn2bGAPvUX5GluRXOUnaMrINHjQ55uC3ZqllRDaUcoTAITPjPlvT76cNjNlZAPTM00Y71uOjrE"
// live key: ""
const PUBLIC_KEY = "pk_test_51KjTNTD1ctBA5rzvPq6FjtoOxn2bGAPvUX5GluRXOUnaMrINHjQ55uC3ZqllRDaUcoTAITPjPlvT76cNjNlZAPTM00Y71uOjrE";
const stripePromise = loadStripe(PUBLIC_KEY);

const cardImg = 'https://assets.yakera.org/yakera/card.webp';
const zelleLogo = 'https://assets.yakera.org/yakera/zelle.webp';

function PaymentAuth(props) {
    const EN = props.EN
    const [openZelle, setOpenZelle] = React.useState(false);
    
    const shouldShowZelle = props?.isAcceptingZelle;

    async function onZelle(){
        setOpenZelle(!openZelle)
    }

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create payment intent
        api.post(`/stripe/create-payment-intent`, {
            items: [
                {
                    id: "donation",
                    quantity: props.amount
                },
                {
                    id: "tips",
                    quantity: props.tip
                },
                {
                    id: "total",
                    quantity: props.amount + props.tip
                },
            ],
        }).then((res) => setClientSecret(res.data.clientSecret));
    }, [props]);

    const appearance = {
        theme: 'flat'
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
                    {EN ? 'Amount to be donated:' : 'Monto a donar:'} <label style={{color:'#ea8737'}}>${total_amount}</label>
                    </h4>
                    <p>{EN ? 'Please select a payment method' : 'Por favor seleccione un método de pago.'}</p>
                </div>
                 {/*<PayPal
                    amount={total_amount}
                    onSuccess={props.OnSuccessPayment}
                    onClick={props.OnPaymentClick}
                    onError={props.OnPaymentError}
                    onCancel={props.OnPaymentCancel}
                /> */}

                <Accordion>
                    <AccordionCard>
                        <Accordion.Toggle as={AccordionCard.Header} eventKey="0" className="stripe-but align-items-center d-flex justify-content-center">
                            <div>
                                <img className='card-img' alt="card" src={cardImg}></img>
                                <span id="stripe-option">{EN ? 'Credit or Debit' : 'Crédito o Débito'}</span>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <AccordionCard.Body>
                                {clientSecret && (
                                    <Elements options={options} stripe={stripePromise}>
                                        <StripeForm 
                                            EN={EN}
                                            slug={props.slug}
                                            email={props.email}
                                            name={props.name}
                                            amount={props.amount}
                                            tip={props.tip}
                                            comment={props.comment}
                                            isAnon={props.isAnon}
                                            openThanks={props.openThanks}
                                            clientSecret={clientSecret}
                                        />
                                    </Elements>
                                )}
                                {!clientSecret
                                ? EN ? 'Something went wrong, please refresh the page.' : 'Algo salió mal, por favor actualice la página.'
                                : ""}
                            </AccordionCard.Body>
                        </Accordion.Collapse>
                    </AccordionCard>
                </Accordion>

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

            <button className='payment-back-btn' onClick={props.onBack}>
                {EN ? 'Return' : 'Regreso'}
            </button>
            </Card>
        </div>
    )
}

export default PaymentAuth
