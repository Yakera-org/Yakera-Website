import React, { Component } from 'react';
import  { Card } from '@material-ui/core';
import PaymentAuth from './PaymentAuth';
import PaymentDetails from './PaymentDetails';
class PaymentVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkError:"",
            age:false,
            consent:false,
            amount: {
                value: '',
                validateOnChange: false,
                error: '',
              },
            name: {
                value: '',
                validateOnChange: false,
                error: '',
            },
            email: {
                value: '',
                validateOnChange: false,
                error: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.onConsentCheck = this.onConsentCheck.bind(this);
        this.onAgeCheck = this.onAgeCheck.bind(this);
        this.onContinue = this.onContinue.bind(this);
    }

    handleChange(validationFunc, evt) {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        this.setState(state => ({
          [field]: {
            ...state[field],
            value: fieldVal,
            error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
          }
        }));
      }

    onConsentCheck(){
        this.setState({
            consent: !this.state.consent
        })
    }

    onAgeCheck(){
        this.setState({
            age: !this.state.age
        })
    }

    onContinue(amount, email, name){
        this.setState({
            hasAmount: true,
            amount: amount,
            name: name,
            email: email,
        })
    }
    

    render() {
        
        return (
            <div className="payment-visual">
                 <Card id="donateRef" className="payment-card">

                    <div className="payment-card-sec">
                    {!this.state.hasAmount

                        ? 
                        <PaymentDetails 
                            language={this.props.language}
                            onContinue={this.onContinue}
                        />
                        :
                         <PaymentAuth />
                    }
                    </div>    
                </Card>  
            </div>
        );
    }
}

export default PaymentVisual;