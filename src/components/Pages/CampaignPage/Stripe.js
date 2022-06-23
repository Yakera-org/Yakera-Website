import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import LanguageService from '../../../services/language';
import api from '../../../services/api';
import { Spinner } from "react-bootstrap";
import "./Stripe.css";

function StripeForm(props)
{
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [displayError, setDisplayError] = useState(false);

    const addAmount = async (paymentIntent, status) => {
        try
        {
            const payload = {
                "slug": props.slug,
                "email": props.email,
                "name": props.name,
                "amount": props.amount,
                "status": status,
                "tip": props.tip,
                "paymentID": paymentIntent.id,
                "comment": props.comment,
                "language": LanguageService.getLanguage(),
                "isAnonymous": props.isAnon,
                "paymentMethod": "stripe",
            };

            await api.post(`/campaigns/donate`, payload);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        if(!stripe)
        {
            return;
        }

        /*
        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
        */
       const clientSecret = props.clientSecret;

        if(!clientSecret)
        {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch(paymentIntent.status)
            {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    /*
                    addAmount(paymentIntent.id, "success");
                    props.openThanks();
                    */
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    // addAmount({}, "error");
                    break;
                default:
                    setMessage("Something went wrong.");
                    // addAmount({}, "error");
                    break;
            }
        });
    }, [stripe, props]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements)
        {
            // Stripe has not loaded
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            /*
            confirmParams: {
                // Change to successful payment url
                return_url: "https://yakera.org/successful-payment-url"
            },
            */
           redirect: "if_required"
        });

        if(error)
        {
            if(error.type === "card_error" || error.type === "validation_error")
            {
                if(error.payment_intent?.last_payment_error.payment_method.billing_details.address.country === 'US')
                {
                    setMessage(props.EN
                        ?
                        'Please note that at this time we are unable to accept cards from the United States. If you have a card from the US, please make your contribution directly with Zelle or use a different card to complete your payment.'
                        :
                        'Por favor note que actualmente no nos encontramos aceptando tarjetas de los Estados Unidos. Si tiene una tarjeta de los EEUU, por favor haga su contribución directamente con Zelle o utilice otra tarjeta para completar el pago.');
                    setDisplayError(true);
                }
                else
                {
                    setMessage(error.message);
                }
            }
            else
            {
                setMessage("An unexpected error occured.");
            }

            addAmount({}, "error");
        }
        else
        {
            const clientSecret = props.clientSecret;

            stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
                switch(paymentIntent.status)
                {
                    case "succeeded":
                        setMessage("Payment succeeded!");
                        addAmount(paymentIntent, "success");
                        setDisplayError(false);
                        props.openThanks();
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        setMessage("Your payment was not successful, please try again.");
                        addAmount({}, "error");
                        break;
                    default:
                        setMessage("Something went wrong.");
                        addAmount({}, "error");
                        break;
                }
            });
        }

        console.log(message);

        setIsLoading(false);
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            {/* Show any error or success message */}
            {/* message && <div id="payment-message">{message}</div> */}
            {message && displayError && <div id="payment-message" className="payment-error">{message}</div>}
            <button className="stripe-donate-btn" disabled={isLoading || !stripe || !elements} id="submit">
                {isLoading 
                 ? 
                 <Spinner animation="border" role="status">
                    <span className="visually-hidden">{props.EN ? '' : ''}</span>
                 </Spinner>
                 : 
                 <div>{props.EN ? 'Donate' : 'Donar'}</div>
                }
            </button>
            {props.EN
                ?
                <div className="powered-by">Payments powered by <a className="stripe-link" href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a></div>
                :
                <div className="powered-by">Pagos a través de <a className="stripe-link" href="https://stripe.com/es-us" target="_blank" rel="noopener noreferrer">Stripe</a></div>
            }
            {props.EN
             ?
             <div className="yakera-terms">By continuing, you accept the <a className="terms-link" href="/terms" target="_blank">terms and conditions</a> of Yakera.</div>
             :
             <div className="yakera-terms">Al continuar, aceptas los <a className="terms-link" href="/terms" target="_blank">terminos y condiciones</a> de Yakera.</div>
            }
        </form>
    );

}

export default StripeForm;
