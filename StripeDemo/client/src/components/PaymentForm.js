import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";


function PaymentForm()
{
    const [success, setSuccess] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        if(!error)
        {
            try
            {
                const {id} = paymentMethod;
                // change amount to reflect real amount
                const response = await axios.post("http://localhost:8000/payment", {
                    amount: 10000,
                    id: id
                })

                if(response.data.success)
                {
                    console.log("Successful payment");
                    setSuccess(true);
                }
            }
            catch(err)
            {
                console.log("Error:", err);
            }
        }
        else
        {
            console.log(error.message);
        }
    }

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset>
                <div>
                    <CardElement />
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
        <div>
            <h2>You have donated successfully</h2>
        </div>
        }
        </>
    )
}

export default PaymentForm;
