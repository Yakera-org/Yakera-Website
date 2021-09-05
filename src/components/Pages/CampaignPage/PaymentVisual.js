import React, { Component } from 'react';
import  { Card } from '@material-ui/core';
import PaymentAuth from './PaymentAuth';
import PaymentDetails from './PaymentDetails';
class PaymentVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasDetails: false,
            amount: '',
            name: '',
            email: '',
            tip:''
        }
        this.onContinue = this.onContinue.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onContinue(amount, email, name, tip){
        this.setState({
            hasDetails: true,
            amount: amount,
            name: name,
            email: email,
            tip: tip
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

    render() {        
        return (
            <div key={this.props.presetAmount} className="payment-visual" id="donateRef">
                <div className="payment-card-sec">
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
                            tip={this.state.tip}
                            onBack={this.onBack}
                        />
                    }
                </div>    
            </div>
        );
    }
}

export default PaymentVisual;