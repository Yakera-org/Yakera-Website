import React from 'react';
import {Card} from '@material-ui/core';
import PayPal from './Paypal';
import zelleLogo from '../../../pics/zelle.png';
import ZelleLogic from './ZelleLogic';


function PaymentAuth(props) {
    const EN = props.EN
    const [openZelle, setOpenZelle] = React.useState(false);
    
    const shouldShowZelle = props?.isAcceptingZelle;

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
                        <ZelleLogic
                            EN={EN}
                            slug={props.slug}
                            email={props.email}
                            name={props.name}
                            amount={props.amount}
                            tip={props.tip}
                            comment={props.comment}
                            isAnon={props.isAnon}
                            openThanks={props.openThanks}
                            recipientName={props.recipientName}
                            recipientEmail={props.recipientEmail}
                        />
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
