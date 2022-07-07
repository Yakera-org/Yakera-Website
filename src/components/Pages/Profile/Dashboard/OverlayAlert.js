import React from 'react';
import { userServices } from '../UserService';
import "./OverlayAlert.scss"
import HashLoader from "react-spinners/HashLoader";
import { Alert } from 'reactstrap';

const withdrawImage = "https://assets.yakera.org/yakera/partial-withdrawal-notification.webp";
const endImage = "https://assets.yakera.org/yakera/end-campaign-notification.webp";

function OverlayAlert(props) {
    const EN = props.EN
    const data = props.data
    const slug = data.slugToBeWithdrawn
    const type =  data.typeOfWithdraw

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");
    

    function onClose(){
        window.onscroll=function(){};
        props.onClose(false)
    }

    async function onWithdraw(e){
        setError("")
        setSuccess("")
        e.preventDefault()
        setLoading(true)
        try{
            await userServices.withdrawFunds({
                "slug": slug,
                "type": type
            })
            setSuccess(EN?"Funds withdrawn successfully, please refresh the page." : "Fondos retirados con éxito, actualice la página.")
        } 
        catch(e){
            if(e.response.data.code === 422){
                setError(EN? "This campaign already has an ongoing withdrawal request." : "Esta campaña ya tiene una solicitud de retiro en curso.")
            }else{
                setError(EN ? "Sorry, something went wrong, please try again." : "Lo sentimos, algo salió mal, por favor inténtalo de nuevo.");
            }
        }
        finally{
            setLoading(false)
        } 
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
                    {success
                        ?
                        <Alert color="success" id='alert' style={{width:"50%", marginLeft:"25%"}}>
                            {success}
                        </Alert>
                        :
                        ''
                    }
                    {error
                        ?
                        <Alert color="danger" id='alert' style={{width:"50%", marginLeft:"25%"}}>
                            {error}
                        </Alert>
                        :
                        ''
                    }
                    <button style={{display:success?"none":""}} onClick={onWithdraw}>
                        {loading
                        ?
                        <div className="loader-wrapper">
                            <HashLoader
                                size={20}
                                color={"#fff"}
                                loading={true}
                                />
                        </div>
                        :
                        type==="partial"?
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