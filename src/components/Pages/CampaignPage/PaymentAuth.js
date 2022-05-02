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

    const total_amount = Math.round((parseFloat(props.amount) + parseFloat(props.tip)) * Math.pow(10, 2)) / Math.pow(10, 2);
    return (
        <div>
             <div className='details'>
                 {EN ? 'Payment authentication' : 'Autenticación de pago'}
            </div>
            <Card className='payment-auth-card'>

                <div className='auth-axplanation'>
                    <h3 className='donation-text'>
                    {EN ? 'Amount to donate: ' : 'Monto a donar: '}
                    <span className='donation-amount'>{total_amount.toFixed(2)}$</span>
                    </h3>
                    <div className='details' id="payment-method-details">
                        {EN ? 'Please select a payment method' : 'Por favor seleccione un método de pago'}
                    </div>
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
                        className="airtm-but"
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
                {EN ? 'Return' : 'Regresar'}
            </button>
            </Card>
        </div>
    )
}

export default PaymentAuth
