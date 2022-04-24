import React, { useEffect, useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";


function PaymentForm(props)
{
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendStatus = async (paymentID, status) => {
        let data = {
            status: status,
            donation: props.donation,
            tip: props.tip,
            paymentID: paymentID
        }

        console.log(await axios.post("http://localhost:8000/payment-data", data));
    };

    useEffect(() => {
        if(!stripe)
        {
            return;
        }
        
        /*
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
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
                    setMessage("Payment succeded!");
                    // sendStatus(paymentIntent.id, "success");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    // sendStatus({}, "error");
                    break;
                default:
                    setMessage("Something went wrong.");
                    // sendStatus({}, "error");
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
                return_url: "http://localhost:3000/"
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
            const clientSecret = props.clientSecret;

            stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
                switch(paymentIntent.status)
                {
                    case "succeeded":
                        setMessage("Payment succeded!");
                        sendStatus(paymentIntent.id, "success");
                        break;
                    case "processing":
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        setMessage("Your payment was not successful, please try again.");
                        sendStatus({}, "error");
                        break;
                    default:
                        setMessage("Something went wrong.");
                        sendStatus({}, "error");
                        break;
                }
            });
        }

        setIsLoading(false);
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Donate"}
                </span>
            </button>
            {/* Show any error or success message */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export default PaymentForm;
