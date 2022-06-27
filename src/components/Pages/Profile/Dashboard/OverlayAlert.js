import React from 'react';
import "./OverlayAlert.scss"

const withdrawImage = "https://assets.yakera.org/yakera/partial-withdrawal-notification.webp";
const endImage = "https://assets.yakera.org/yakera/end-campaign-notification.webp";

function OverlayAlert(props) {
    const EN = props.EN
    const data = props.data
    const slug = data.slugToBeWithdrawn
    const type =  data.typeOfWithdraw
    console.log(type)
    function onClose(){
        window.onscroll=function(){};
        props.onClose(false)
    }
    
    return (
        <div>
            <div className='overlay-alert' />
            <div className='overlay-card'>
                <div id="close">
                    <button onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div id="text">
                    <img style={{width:type==="partial"?"25%":"40%"}}src={type==="partial"?withdrawImage:endImage} alt="withdraw-visual" />
                    <p>
                        <b>
                            {type==="partial"?
                                EN ? 
                                "You are about to withdraw your collected funds, they will be transferred in a period of 24 to 72 hours. "
                                :
                                "Estás a punto de retirar tus fondos recaudados, los mismos serán transferidos en un período de 24 a 72 horas. "
                            :
                                EN ?
                                "You're about to close your campaign."
                                :
                                "Estás a punto de cerrar tu campaña."
                            }
                        </b>
                            {type==="partial"?
                                EN ?
                                "Your campaign will remain active on our platform until you decide to withdraw it. "
                                :
                                "Tu campaña seguirá activa en nuestra plataforma hasta que decidas retirarla. "
                            :
                                EN ?
                                "All your funds raised will be transferred to your Reserve account within 24 to 72 hours."
                                :
                                "Todos tus fondos recaudados serán transferidos a tu cuenta de Reserve en un período de 24 a 72 horas."
                            }
                    </p>
                    <button>
                        {type==="partial"?
                            EN ?
                            "I understand!"
                            :
                            "¡Entiendo!"
                        :
                            EN ?
                            "Close Campaign"
                            :
                            "Cerrar campaña"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OverlayAlert;