import React from "react";
import CreatCampaignDetails from "./CreatCampaignDetails";
import {Alert} from 'reactstrap'
import LanguageService from "../../../services/language";
import HashLoader from "react-spinners/HashLoader";
import './CreateCampaignPage.css';
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";

function CreateCampaignVisuals(props) {

    React.useEffect(() =>{
        setLanguage(LanguageService.getLanguage());
    }, [])

    const [language, setLanguage] = React.useState('');
    const [isUploading, setIsUploading] = React.useState('');

    var EN;
    if(language === "en"){
        EN = true
    }else{
        EN = false
    }
    return(
        <div className='create-page'>
            <WhatsAppButton EN = {EN}></WhatsAppButton>
            <div id='background' >
                <h1>
                    {EN ? 'Create your campaign' : 'Crea tu campaña'}
                </h1>
                <p id="info-text">
                    {EN ? 'Yakera is a crowdfunding platform that allows people to tell their stories and receive donations for healthcare, education, nutrition, and small business. We believe in people\'s dignity and ability to satisfy their own needs via direct transfers.' : 'Yakera es una plataforma de crowdfunding que empodera a los usuarios a contar sus historias y recibir donaciones a campañas que se enfocan en las categorías de salud, educación, alimentación, y pequeños negocios. Creemos en la dignidad de nuestros usuarios y su capacidad de satisfacer sus propias necesidades a través de transferencias directas.'}
                    
                </p>
                <p id="info-text">
                    {EN ? 'In this form you can tell us your story so that it\'s featured in Yakera\'s website and you can start receiving donations.' : 'Con esta forma usted puede contarnos su historia para que aparezca en el sitio de Yakera para recibir donaciones.'}
                </p>
                {EN ? 
                <p id="info-text">
                    If you have any questions, text us in WhatsApp at  <b>+1 740-462-2212 </b> 
                    or <b>+56 9 5699 7352</b> or at <b>info@yakera.org</b>. We are here to help you
                    and answer any questions.
                </p> : 
                <p id="info-text">
                   Si tiene más dudas, envíe un mensaje al WhatsApp <b>+1 (740)462-2212</b> o <b>+56 9 5699 7352</b>. También puede enviar un correo electrónico a <b>info@yakera.org</b>
                </p>
                }
                
                
                <CreatCampaignDetails EN={EN} data={props.data} handleChange={props.handleChange} setData={props.setData} setIsUploading={setIsUploading}/>

               
                { props.success
                    ?
                    <Alert color="success" id='alert'>
                        {props.success}
                        <br />
                        {EN ? <>Head to your <a href="/dashboard" style={{color:'darkgreen', textDecoration:'underline'}}> Dashboard</a>.</> : <>Dirígete a tu <a href="/dashboard" style={{color:'darkgreen', textDecoration:'underline'}}> Mi Cuenta</a>.</>}                                            
                    </Alert>
                    :
                    ''
                }
                { props.error
                    ?
                    <Alert color="danger" id='alert'>
                        {props.error}
                    </Alert>
                    :
                    ''
                }
                {
                    props.loader
                    ?
                    <div className="sweet-loading">
                        <div className='loader-wrapper' style={{marginLeft:'-10px', marginBottom:'10px'}}>
                            <HashLoader
                                color={"#ea8737"}
                                loading={props.loader}
                            />
                        </div>
                    </div> 
                    :
                    ""
                }
               
                { !props.success
                ?
                <div id='create-campaign'>
                    {
                        isUploading
                        ?
                            <button  onClick={props.submit} id="disabled-create" disabled={true} style={{backgroundColor:'grey'}}>
                                {EN ? 'Create Campaign' : 'Crear Campaña'}
                            </button>
                        :
                            <button  onClick={props.submit}>
                                {EN ? 'Create Campaign' : 'Crear Campaña'}
                            </button>
                    }
                </div>
                :
                ""}
            </div>
        </div>
    )
}

export default CreateCampaignVisuals;