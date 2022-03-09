import React from 'react';
import {Card} from '@material-ui/core';
import PayPal from './Paypal';
import airtmLogo from '../../../pics/airtmbutton.png';
import zelleLogo from '../../../pics/zelle.png';


function PaymentAuth(props) {
    const EN = props.EN
    const [openZelle, setOpenZelle] = React.useState(false);
    
    const shouldShowZelle = props?.isAcceptingZelle;


    function onAirTM(){
        props.onAirTM(total_amount, props.title, props.name, props.email)
    }
    async function onZelle(){
        setOpenZelle(!openZelle)
    }

    const total_amount = parseInt(props.amount) + parseInt(props.tip)
    return (
        <div>    
             <p>{EN ? 'Payment Authentication' : 'Autenticación de pago'}</p>
            <Card className='payment-auth-card'>

                <div className='auth-axplanation'>
                    <h4>
                    {EN ? 'Amount to be donated:' : 'Monto a donar:'} <label style={{color:'#ea8737'}}>{total_amount} $ </label>
                    </h4>
                    <p>{EN ? 'Please select a payment method' : 'Por favor seleccione un método de pago.'}</p>
                </div>
                <PayPal 
                    amount={total_amount} 
                    onSuccess={props.OnSuccessPayment}
                    onClick={props.OnPaymentClick} 
                    onError={props.OnPaymentError} 
                    onCancel={props.OnPaymentCancel}
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
                            {EN ? 'This service is coming soon. Please try using your credit or debit card, Paypal or Airtm.' : 'Este servicio llegará pronto. Por favor efectua tu pago usando tu tarjeta de debito o credito, Paypal o Airtm.'}                            
                        </p>
                        :
                        ''
                    }
                </div>
                :
                ''
                }


            <button className='payment-back-btn' onClick={props.onBack}>
                {EN ? 'Return' : 'Regreso'}
            </button>
            </Card>
        </div>
    )
}

export default PaymentAuth