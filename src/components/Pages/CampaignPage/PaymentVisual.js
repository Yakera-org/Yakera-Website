import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PaymentAuth from "./PaymentAuth";
import PaymentDetails from "./PaymentDetails";
import Loader from "react-loader-spinner";
import api from "../../../services/api";
import LanguageService from "../../../services/language";
import "./Payment.css";
import crypto from "crypto";
import ThanksCard from "./thanksCard";
import PaymentLocationCheck from "./PaymentLocationCheck";

const hmacEncryption = (body, secret) =>
  crypto.createHmac("sha256", secret).update(body).digest("hex");

class PaymentVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasDetails: false,
      amount: "",
      name: "",
      email: "",
      tip: "",
      isAnon: false,
      comment: "",
      loading: false,
      thanksOpen: false,
      EN: this.props.EN,
      locationCheck: false,
      restrictPayment: false,
    };
    this.onContinue = this.onContinue.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBack = this.onBack.bind(this);
    this.switchLoader = this.switchLoader.bind(this);
    this.addAmount = this.addAmount.bind(this);
  }

  onContinue(amount, email, name, tip, comment, anon) {
    var element = document.getElementById("donateRef");
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

    this.setState({
      hasDetails: true,
      amount: amount,
      name: name,
      email: email,
      tip: tip,
      comment: comment,
      isAnon: anon,
    });
  }

  onClose() {
    this.setState({
      hasDetails: false,
      locationCheck: false,
      restrictPayment: false,
    });
  }
  onBack() {
    this.setState({
      hasDetails: false,
      locationCheck: false,
      restrictPayment: false,
    });
  }

  switchLoader(status) {
    this.setState({
      loading: status,
    });
  }

  OnPaymentClick() {
    console.log("click");
    this.switchLoader(false);
  }
  async OnPaymentCancel() {
    console.log("payment canceled");
    await this.addAmount({}, "cancel");
    this.switchLoader(false);
  }
  async OnPaymentError() {
    console.log("payment failed");
    await this.addAmount({}, "error");
    this.switchLoader(false);
  }
  async OnSuccessPayment(details, data) {
    console.log("payment successful");
    // Pass data instead of details to get orderID as described here: https://luehangs.site/lue_hang/projects/react-paypal-button-v2
    await this.addAmount(data, "success");
    this.openThanks();
    // console.log(details)
    console.log(data);
    this.switchLoader(false);
  }

  async addAmount(data, status) {
    try {
      const payload = {
        slug: this.props.slug,
        email: this.state.email,
        name: this.state.name,
        amount: this.state.amount,
        status: status,
        tip: this.state.tip,
        paymentID: data.orderID,
        comment: this.state.comment,
        language: LanguageService.getLanguage(),
        isAnonymous: this.state.isAnon,
      };

      const encryptedRequestBody = hmacEncryption(
        JSON.stringify(payload),
        "test"
      );
      const options = {
        headers: {
          "Yakera-Signature": encryptedRequestBody,
        },
      };
      console.log(await api.post(`/campaigns/donate/`, payload, options));
    } catch (err) {
      console.error(err);
    }
  }
  openThanks() {
    this.setState({
      thanksOpen: true,
    });
  }
  closeThanks() {
    window.location.reload(false);
  }

  onLocationContinue() {
    this.setState({
      locationCheck: true,
    });
  }

  setRestriction() {
    this.setState({
      restrictPayment: !this.state.restrictPayment,
    });
  }

  render() {
    const EN = this.state.EN;
    return (
      <div
        key={this.props.presetAmount}
        className="payment-visual"
        id="donateRef"
      >
        <ThanksCard
          EN={EN}
          open={this.state.thanksOpen}
          amount={Number(this.state.amount)}
          title={this.props.title}
          onClose={this.closeThanks.bind(this)}
        />
        <Grid
          container
          style={{ alignContent: "center", alignItems: "flex-start" }}
        >
          <div className="payment-card-sec">
            <div className="loader">
              <Loader
                type="Bars"
                color="#ea8737"
                height={100}
                width={100}
                visible={this.state.loading}
              />
            </div>
            <h3 className="donation-header">
              {EN ? "Donate Now!" : "¡Donar Ahora!"}
            </h3>
            <hr id="donate-now-hr" />

            {!this.state.hasDetails ? (
              // ask for payment details

              <div className="payment-card">
                <PaymentDetails
                  EN={EN}
                  onContinue={this.onContinue}
                  openMaintenance={this.props.setOpenMaintenance}
                  presetAmount={this.props.presetAmount}
                />
              </div>
            ) : !this.state.locationCheck ? (
              // check location

              <PaymentLocationCheck
                EN={EN}
                onBack={this.onBack}
                onContinue={this.onLocationContinue.bind(this)}
                restricted={this.state.restrictPayment}
                setRestricted={this.setRestriction.bind(this)}
              />
            ) : (
              // else get to payment authentication

              <PaymentAuth
                className="payment-auth"
                EN={EN}
                language={this.props.language}
                onClose={this.onClose}
                amount={parseFloat(this.state.amount)}
                name={this.state.name}
                email={this.state.email}
                isAnon={this.state.isAnon}
                slug={this.props.slug}
                tip={this.state.tip}
                onBack={this.onBack}
                title={this.props.title}
                recipientEmail={this.props.recipientEmail}
                recipientName={this.props.recipientName}
                comment={this.state.comment}
                OnSuccessPayment={this.OnSuccessPayment.bind(this)}
                OnPaymentClick={this.OnPaymentClick.bind(this)}
                OnPaymentError={this.OnPaymentError.bind(this)}
                OnPaymentCancel={this.OnPaymentCancel.bind(this)}
                isAcceptingZelle={this.props.isAcceptingZelle}
                openThanks={this.openThanks.bind(this)}
                restricted={this.state.restrictPayment}
              />
            )}
          </div>
        </Grid>
      </div>
    );
  }
}

export default PaymentVisual;
