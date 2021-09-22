import React, { Component } from 'react';
import PaymentAuth from './PaymentAuth';
import PaymentDetails from './PaymentDetails';
import Loader from "react-loader-spinner";
import api from "../../../services/api";
import ThanksCard from './thanksCard';
import AirTM from './AirTM';

class PaymentVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasDetails: false,
            amount: '',
            name: '',
            email: '',
            tip: '',
            comment: '',
            loading: false,
            thanksOpen: false
        }
        this.onContinue = this.onContinue.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBack = this.onBack.bind(this);
        this.switchLoader = this.switchLoader.bind(this);
        this.addAmount = this.addAmount.bind(this);
    }

    onContinue(amount, email, name, tip, comment){
        var element = document.getElementById("donateRef");
        element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        
        this.setState({
            hasDetails: true,
            amount: amount,
            name: name,
            email: email,
            tip: tip,
            comment: comment
        })
    }

    onClose(){
        this.setState({
            hasDetails:false
        })
    }
    onBack(){
        this.setState({
            hasDetails:false
        })
    }

    switchLoader(status){
        this.setState({
            loading: status
        })
    }

    OnPaymentClick(){
        console.log('click')
        this.switchLoader(true);
    }
    OnPaymentError(){
        console.log('payment failed')
        this.switchLoader(false);
    }
    async OnSuccessPayment(details, data){
        console.log("payment successful")
        await this.addAmount(details);
        this.openThanks()
        console.log(details)
        console.log(data)
        this.switchLoader(false);
    }
    async addAmount(details){
        try {
            const payload = {
                "slug": this.props.slug,
                "email": this.state.email,
                "name": this.state.name,
                "amount": this.state.amount,
                "tip": this.state.tip,
                "paymentID": details.id,
                "comment": this.state.comment
            }
            console.log(await api.post(`/campaigns/donate`, payload))
        } catch (err) {
            console.log(err);
        }
    }
    openThanks(){
        this.setState({
            thanksOpen: true
        })
    }
    closeThanks(){
        window.location.reload(false);
    }
    onAirTM(val, title){
        AirTM(val, title)
        //this.switchLoader(true)
    }


    render() {        
        return (
            <div key={this.props.presetAmount} className="payment-visual" id="donateRef">
                <ThanksCard 
                    open={this.state.thanksOpen} 
                    amount={this.state.amount+this.state.tip}
                    onClose={this.closeThanks.bind(this)}
                    />
                <div className="payment-card-sec">
                    <div className='loader'>
                        <Loader
                            type="Bars"
                            color="#ea8737"
                            height={100}
                            width={100}
                            visible={this.state.loading}
                        />
                    </div>
                <h1 >
                    Donate Now
                </h1>
                <hr id='donate-now-hr'/>

                    {!this.state.hasDetails
                        ? //ask for payment details

                        <div  className="payment-card">
                            <PaymentDetails 
                                language={this.props.language}
                                onContinue={this.onContinue}
                                presetAmount={this.props.presetAmount}
                                />
                        </div>  

                        : // else get to payment authentication

                        <PaymentAuth className="payment-auth"
                            language={this.props.language}
                            onClose={this.onClose}
                            amount={this.state.amount}
                            name={this.state.name}
                            email={this.state.email}
                            slug={this.props.slug}
                            onAirTM={this.onAirTM.bind(this)}
                            tip={this.state.tip}
                            onBack={this.onBack}
                            title={this.props.title}
                            comment={this.state.comment}
                            OnSuccessPayment={this.OnSuccessPayment.bind(this)}
                            OnPaymentClick={this.OnPaymentClick.bind(this)} 
                            OnPaymentError={this.OnPaymentError.bind(this)} 
                        />
                    }
                </div>    
            </div>
        );
    }
}

export default PaymentVisual;