require("dotenv").config();

const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/payment", cors(), async (request, response) => {
    let {amount, id} = request.body;

    try
    {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "Generic Donation Company",
            payment_method: id,
            confirm: true
        })

        console.log("Payment:", payment);
        response.json({
            message: "Payment successful",
            success: true
        });
    }
    catch(error)
    {
        console.log("Error:", error);
        response.json({
            message: "Payment failed",
            success: false
        });
    }
});

app.listen(process.env.PORT, () => {console.log("Listening on port", process.env.PORT)});
