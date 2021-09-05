import React, { PureComponent, Fragment } from 'react';
import {Dialog, Card} from '@material-ui/core';
import PayPal from './Paypal';
import airtmLogo from '../../../pics/airtmbutton.png';
import zelleLogo from '../../../pics/zelle.png';

class PaymentAuth extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {

        const language = this.props.language;
        var EN = true;
        if(language !=="en"){
            EN = false
        }

        const total_amount = parseInt(this.props.amount) + parseInt(this.props.tip)
        return (
            <div>    
                 <p>{EN ? 'Payment Authentication' : 'Payment Authentication'}</p>
                <Card className='payment-auth-card'>

                    <div className='auth-axplanation'>
                        <p>{EN ? 'Please select a payment method' : 'Please select a payment method.'}</p>
                        <h4>
                            Amount to be donated: <label style={{color:'#ea8737'}}>{total_amount} $ </label>
                        </h4>
                    </div>
                    <PayPal 
                        amount={this.props.amount} 
                    />
                    <button
                        type="submit"
                        className="btn btn-secondary btn-block airtm-but"    
                        onClick={this.onAirTM}                  
                    >
                        <img src={airtmLogo} alt="airtm-logo-button" />
                    </button>
                    <button
                        type="submit"
                        className="btn btn-secondary btn-block airtm-but"    
                        onClick={this.onZelle}                  
                    >
                        <img src={zelleLogo} alt="zelle-logo-button" />
                    </button>


                </Card>
                <button className='payment-back-btn' onClick={this.props.onBack}>
                    Return
                </button>
            </div>
        )
    }
}

export default PaymentAuth