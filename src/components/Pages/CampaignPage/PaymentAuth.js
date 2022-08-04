import React, { useState, useEffect } from 'react';
import {Card} from '@material-ui/core';
import reserveLogo from '../../../pics/reservebutton.png'
//import zelleLogo from '../../../pics/zelle.png';
import ZelleLogic from './ZelleLogic';
import ReserveLogic from './ReserveLogic'

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import StripeForm from './Stripe';
import api from '../../../services/api';
import { Accordion, Card as AccordionCard } from 'react-bootstrap';
import PayPal from './Paypal';
import Environment from '../../../services/Environment';

const PUBLIC_KEY = Environment.getStripeToken();
const stripePromise = loadStripe(PUBLIC_KEY);

const cardImg = 'https://assets.yakera.org/yakera/card.webp';
const zelleLogo = 'https://assets.yakera.org/yakera/zelle.webp';
const paypalLogo = 'https://assets.yakera.org/yakera/paypal-logo.webp';


function PaymentAuth(props) {
    const EN = props.EN

    const shouldShowZelle = props?.isAcceptingZelle && props?.recipientName && props?.recipientEmail;

    const total_amount = Math.round((parseFloat(props.amount) + parseFloat(props.tip)) * Math.pow(10, 2)) / Math.pow(10, 2);
    const [clientSecret, setClientSecret] = useState("");

    async function onPaymentAuthClick(e){
        const authname = e.target.getAttribute("name")
        try {
            await api.get(`/track?path=authentication/${authname}`);
        } catch (err) {
            console.log('Error. ' + err)
        }
    }

    useEffect(() => {
        // Create payment intent
        api.post(`/stripe/create-payment-intent`, {
            items: [
                {
                    id: "donation",
                    quantity: parseFloat(props.amount)
                },
                {
                    id: "tips",
                    quantity: parseFloat(props.tip)
                },
                {
                    id: "total",
                    quantity: parseFloat(props.amount) + parseFloat(props.tip)
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

    return (
        <div>
             <div className='details'>
                 {EN ? 'Payment authentication' : 'Autenticación de pago'}
            </div>
            <Card className='payment-auth-card'>

                <div className='auth-axplanation'>
                    <h4>
                    {EN ? 'Amount to be donated:' : 'Monto a donar:'} <label style={{color:'#ea8737'}}>${total_amount} USD</label>
                    </h4>
                    <p>{EN ? 'Please select a payment method' : 'Por favor seleccione un método de pago.'}</p>
                </div>

                <Accordion>
                    <AccordionCard>
                        <Accordion.Toggle name="creditcard" onClick={onPaymentAuthClick} as={AccordionCard.Header} eventKey="0" className="stripe-but align-items-center d-flex justify-content-center">
                            <div name="creditcard">
                                <img name="creditcard" className='card-img' alt="card" src={cardImg}></img>
                                <span name="creditcard" id="stripe-option">{EN ? 'Credit or Debit' : 'Crédito o Débito'}</span>
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

                <br />

                <Accordion>
                    <AccordionCard>
                        <Accordion.Toggle as={AccordionCard.Header} name="reserve" onClick={onPaymentAuthClick} eventKey="0" className="reserve-but align-items-center d-flex justify-content-center">
                            <div name="reserve">
                                <img name="reserve" alt="reserve-logo" src={reserveLogo} />
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <AccordionCard.Body>
                                <ReserveLogic
                                    EN={EN}
                                    slug={props.slug}
                                    email={props.email}
                                    name={props.name}
                                    amount={parseFloat(props.amount) + parseFloat(props.tip)}
                                    tip={props.tip}
                                    comment={props.comment}
                                    isAnon={props.isAnon}
                                    openThanks={props.openThanks}
                                />

                            </AccordionCard.Body>
                        </Accordion.Collapse>
                    </AccordionCard>
                </Accordion>

                <br />

                <Accordion>
                    <AccordionCard>
                        <Accordion.Toggle as={AccordionCard.Header} name="paypal-options" onClick={onPaymentAuthClick} eventKey="0" className="paypal-but align-item-center d-flex justify-content-center">
                            <div name="paypal-options">
                                <img name="paypal-options" src={paypalLogo} alt="paypal-logo" />
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <AccordionCard.Body>
                                <PayPal
                                    EN={EN}
                                    amount={total_amount}
                                    onSuccess={props.OnSuccessPayment}
                                    onClick={props.OnPaymentClick}
                                    onErrror={props.OnPaymentError}
                                    onCancel={props.OnPaymentCancel}
                                />
                            </AccordionCard.Body>
                        </Accordion.Collapse>
                    </AccordionCard>
                </Accordion>

                <br />

                { shouldShowZelle
                ?
                <Accordion>
                    <AccordionCard>
                        <Accordion.Toggle as={AccordionCard.Header} name="zelle" onClick={onPaymentAuthClick} eventKey="0" className="zelle-but align-items-center d-flex justify-content-center">
                            <div name="zelle" >
                                <img name="zelle" src={zelleLogo} alt="zelle-logo-button" />
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <AccordionCard.Body>
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
                            </AccordionCard.Body>
                        </Accordion.Collapse>
                    </AccordionCard>
                </Accordion>

            :
            ''
            }

            <button className='payment-back-btn' onClick={props.onBack}>
                <i className="fas fa-angle-left"></i>{EN ? ' Return' : ' Regresar'}
            </button>
            </Card>
        </div>
    )
}

export default PaymentAuth
