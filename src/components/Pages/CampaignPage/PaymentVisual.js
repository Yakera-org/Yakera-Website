import React, { Component } from 'react';
import  { Card } from '@material-ui/core';
import PaymentAuth from './PaymentAuth';
import PaymentDetails from './PaymentDetails';
class PaymentVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasDetails: false,
            amount: 0,
            name: '',
            email: '',
        }
        this.onContinue = this.onContinue.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onContinue(amount, email, name){
        this.setState({
            hasDetails: true,
            amount: amount,
            name: name,
            email: email,
        })
    }

    onClose(){
        this.setState({
            hasDetails:false
        })
    }
    

    render() {        
        return (
            <div className="payment-visual">
                <div className="payment-card-sec">
                    {!this.state.hasDetails
                        ? //ask for payment details

                        <Card id="donateRef" className="payment-card">
                            <PaymentDetails 
                                language={this.props.language}
                                onContinue={this.onContinue}
                                />
                        </Card>  

                        : // else get to payment authentication

                        <PaymentAuth 
                            language={this.props.language}
                            onClose={this.onClose}
                            amount={this.state.amount}
                        />
                    }
                </div>    
            </div>
        );
    }
}

export default PaymentVisual;