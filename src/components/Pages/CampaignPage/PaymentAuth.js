import React, { PureComponent, Fragment } from 'react';
import {Dialog, Card} from '@material-ui/core';
import PayPal from './Paypal';
import airtmLogo from '../../../pics/airtmbutton.png';
import zelleLogo from '../../../pics/zelle.png';

function PaymentAuth(props) {
    const language = props.language;
    var EN = true;
    if(language !=="en"){
        EN = false
    }

    const total_amount = parseInt(props.amount) + parseInt(props.tip)
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
                    amount={props.amount} 
                />
                <button
                    type="submit"
                    className=" airtm-but"    
                                 
                >
                    <img src={airtmLogo} alt="airtm-logo-button" />
                </button>
                <button
                    type="submit"
                    className=" airtm-but"    
                              
                >
                    <img src={zelleLogo} alt="zelle-logo-button" />
                </button>


            </Card>
            <button className='payment-back-btn' onClick={props.onBack}>
                Return
            </button>
        </div>
    )
}

export default PaymentAuth