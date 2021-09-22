import React, { Component } from 'react';
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
            tip: '',
            comment: ''
        }
        this.onContinue = this.onContinue.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBack = this.onBack.bind(this);
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
                            name={this.state.name}
                            email={this.state.email}
                            onAirTM={this.props.AirTM}
                            tip={this.state.tip}
                            onBack={this.onBack}
                            title={this.props.title}
                            comment={this.state.comment}
                            slug={this.props.slug}
                        />
                    }
                </div>    
            </div>
        );
    }
}

export default PaymentVisual;