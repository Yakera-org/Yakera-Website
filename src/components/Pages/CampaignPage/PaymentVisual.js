import React, { Component } from 'react';
import PaymentAuth from './PaymentAuth';
import PaymentDetails from './PaymentDetails';
import Loader from "react-loader-spinner";
import api from "../../../services/api";
import ThanksCard from './thanksCard';
import AirTM from './AirTM';
import LanguageService from '../../../services/language';

class PaymentVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasDetails: false,
            amount: '',
            name: '',
            email: '',
            tip: '',
            isAnon: false,
            comment: '',
            loading: false,
            thanksOpen: false,
            EN: true
        }
        this.onContinue = this.onContinue.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBack = this.onBack.bind(this);
        this.switchLoader = this.switchLoader.bind(this);
        this.addAmount = this.addAmount.bind(this);
    }

    componentDidMount(){
        const language = LanguageService.getLanguage()
        if (language === "en"){
            this.setState({
                EN: true
            })
        }else{
            this.setState({
                EN: false
            })
        }
    }

    onContinue(amount, email, name, tip, comment, anon){
        console.log(anon)
        var element = document.getElementById("donateRef");
        element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

        this.setState({
            hasDetails: true,
            amount: amount,
            name: name,
            email: email,
            tip: tip,
            comment: comment,
            isAnon: anon
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
        this.switchLoader(false);
    }
    async OnPaymentCancel() {
        console.log('payment canceled');
        await this.addAmount({}, 'cancel');
        this.switchLoader(false);
    }
    async OnPaymentError(){
        console.log('payment failed');
        await this.addAmount({}, 'error');
        this.switchLoader(false);
    }
    async OnSuccessPayment(details, data){
        console.log("payment successful")
        // Pass data instead of details to get orderID as described here: https://luehangs.site/lue_hang/projects/react-paypal-button-v2
        await this.addAmount(data, 'success');
        this.openThanks()
        console.log(details)
        console.log(data)
        this.switchLoader(false);
    }
    async addAmount(data, status){
        try {
            const payload = {
                "slug": this.props.slug,
                "email": this.state.email,
                "name": this.state.name,
                "amount": this.state.amount,
                "status": status,
                "tip": this.state.tip,
                "paymentID": data.orderID,
                "comment": this.state.comment,
                "language": LanguageService.getLanguage(),
                "isAnonymous": this.state.isAnon
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
        const EN = this.state.EN
        return (
            <div key={this.props.presetAmount} className="payment-visual" id="donateRef">
                <ThanksCard
                    EN={EN}
                    //open = {true}
                    open={this.state.thanksOpen}

                    amount={Number(this.state.amount)}
                    title={this.props.title}
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
                    {EN ? 'Donate Now' : 'Donar Ahora' }
                </h1>
                <hr id='donate-now-hr'/>

                    {!this.state.hasDetails
                        ? //ask for payment details

                        <div  className="payment-card">
                            <PaymentDetails
                                EN={EN}
                                onContinue={this.onContinue}
                                presetAmount={this.props.presetAmount}
                                />
                        </div>

                        : // else get to payment authentication

                        <PaymentAuth className="payment-auth"
                            EN={EN}
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
                            OnPaymentCancel={this.OnPaymentCancel.bind(this)}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default PaymentVisual;
