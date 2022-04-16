import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import axios from "axios";


const PUBLIC_KEY = "pk_test_51KjTNTD1ctBA5rzvPq6FjtoOxn2bGAPvUX5GluRXOUnaMrINHjQ55uC3ZqllRDaUcoTAITPjPlvT76cNjNlZAPTM00Y71uOjrE";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer()
{
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        axios.post("http://localhost:8000/payment", {
            items: [{ id: "donation", quantity: 15 }, { id: "tip", quantity: 5 }],
        }).then((res) => setClientSecret(res.data.clientSecret));
    }, []);

    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#eb913b",
            colorBackground: "#f0f0f0",
            colorText: "#0000ff",
            colorDanger: "#c90003",
        }
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripeTestPromise}>
                    <PaymentForm />
                </Elements>
            )}
        </div>
    )
}

export default StripeContainer;
