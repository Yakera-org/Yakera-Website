import React from 'react';
import {Card} from '@material-ui/core';
import PayPal from './Paypal';
import airtmLogo from '../../../pics/airtmbutton.png';
import zelleLogo from '../../../pics/zelle.png';
// import api from "../../../services/api";
import ZelleLogic from './ZelleLogic';


function PaymentAuth(props) {
    const EN = props.EN
    const [shouldShowZelle, setsouldShowZelle] = React.useState(false);
    const [openZelle, setOpenZelle] = React.useState(false);

    React.useEffect(()=> {
        setsouldShowZelle(true);
    }, [])

    function onAirTM(){
        props.onAirTM(total_amount, props.title, props.name, props.email)
    }
    async function onZelle(){
        setOpenZelle(!openZelle)
        // try {
        //     const payload = {
        //         'slug': props.slug,
        //         'status': 'error', // status is a field to know if the transaction was successful. Valid values are 'success', 'cancel' & 'error'
        //         'email': props.email,
        //         'name': props.name,
        //         'amount': parseInt(props.amount),
        //         'tip': parseInt(props.tip),
        //         'paymentID': Math.random().toString(36).slice(2),
        //         'paymentMethod': 'zelle',
        //         'comment': props.comment
        //     }
        //     console.log(payload)
        //     await api.post('/campaigns/donate', payload);
        // } catch (err) {
        //     console.log(err);
        // }
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
                        <ZelleLogic EN={EN} slug={props.slug} email={props.email} name={props.name} amount={props.amount} tip={props.tip} comment={props.comment} isAnon={props.isAnon}/>
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
