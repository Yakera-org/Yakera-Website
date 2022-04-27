import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import LanguageService from '../../../services/language';
import api from '../../../services/api';
import "./Stripe.css";

function StripeForm(props)
{
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
                "stripe": true,
                "paymentMethod": paymentIntent.payment_method,
                "paymentMethodTypes": paymentIntent.paymentMethodTypes
            };

            console.log(await api.post(`/campaigns/donate`, payload));
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
       const clientSecret = this.props.clientSecret;

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
                    this.props.openThanks();
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
    }, [stripe]);

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
                setMessage(error.message);
            }
            else
            {
                setMessage("An unexpected error occured.");
            }
        }
        else
        {
            const clientSecret = this.props.clientSecret;

            stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
                switch(paymentIntent.status)
                {
                    case "succeeded":
                        setMessage("Payment succeeded!");
                        addAmount(paymentIntent, "success");
                        this.props.openThanks();
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
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Stripe"}
                </span>
            </button>
            {/* Show any error or success message */}
            {/* message && <div id="payment-message">{message}</div> */}
        </form>
    );

}

export default StripeForm;
