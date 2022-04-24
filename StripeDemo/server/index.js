require("dotenv").config();

const express = require("express");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");

app.use(express.json());
app.use(cors());

const totalPayment = (items) => {
    return items[0].quantity*100 + items[1].quantity*100;
}

app.post("/payment", cors(), async (request, response) => {
    let { items } = request.body;

    const payment = await stripe.paymentIntents.create({
        amount: totalPayment(items),
        currency: "USD",
        description: "Generic Donation Company",
        payment_method_types: ["card"],
    })

    console.log("Payment:", payment);
    response.send({clientSecret: payment.client_secret,});
});

app.post("/payment-data", cors(), async (request, response) => {
    let data = request.body;

    console.log("request data: ", data);

    if(data)
    {
        console.log("Payment (", data.paymentID, ") status: ", data.status, " - amount: $", data.donation + data.tip);
        response.send({connectionStatus: "success"});
    }
});

app.listen(process.env.PORT, () => {console.log("Listening on port", process.env.PORT)});
