import React from 'react';
import {Card} from '@material-ui/core';
import PayPal from './Paypal';
import airtmLogo from '../../../pics/airtmbutton.png';
import zelleLogo from '../../../pics/zelle.png';
import api from "../../../services/api";


function PaymentAuth(props) {
    const language = props.language;
    var EN = true;
    if(language !=="en"){
        EN = false
    }

    const [shouldShowZelle, setsouldShowZelle] = React.useState(false);
    const [openZelle, setOpenZelle] = React.useState(false);

    React.useEffect(()=> {
        let ranNum = Math.floor(Math.random() * 100);
        if(ranNum < 20){
            setsouldShowZelle(true)
        }
    }, [])

    function onAirTM(){
        props.onAirTM(total_amount, props.title, props.name, props.email)
    }
    async function onZelle(){
        setOpenZelle(!openZelle)
        try {
            const res = await api.post('/campaigns/zelle');
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const total_amount = parseInt(props.amount) + parseInt(props.tip)
    return (
        <div>    
             <p>{EN ? 'Payment Authentication' : 'Payment Authentication'}</p>
            <Card className='payment-auth-card'>

                <div className='auth-axplanation'>
                    <h4>
                        Amount to be donated: <label style={{color:'#ea8737'}}>{total_amount} $ </label>
                    </h4>
                    <p>{EN ? 'Please select a payment method' : 'Please select a payment method.'}</p>
                </div>
                <PayPal 
                    amount={total_amount} 
                />
                <button
                    type="submit"
                    onClick={onAirTM}
                    className=" airtm-but"    
                                 
                >
                    <img src={airtmLogo} alt="airtm-logo-button" />
                </button>
                { shouldShowZelle
                ?
                <div >
                    <button
                        type="submit"
                        className=" airtm-but" 
                        onClick={onZelle}
                    >
                        <img src={zelleLogo} alt="zelle-logo-button" />
                    </button>
                    {
                        openZelle
                        ?
                        <p>
                            This service is coming soon...
                        </p>
                        :
                        ''
                    }
                </div>
                :
                ''
                }


            </Card>
            <button className='payment-back-btn' onClick={props.onBack}>
                Return
            </button>
        </div>
    )
}

export default PaymentAuth