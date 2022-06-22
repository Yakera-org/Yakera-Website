import React from "react";
import CreatCampaignDetails from "./CreateCampaignDetailsNew.js";
import CampaignIntroPage from "./createCampaignIntro";
import {Alert} from 'reactstrap'
import LanguageService from "../../../services/language";
import HashLoader from "react-spinners/HashLoader";
import './CreateCampaignPage.css';
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton";
import { MultiStepForm, Step } from 'react-multi-form-custom'
import { Button } from "react-bootstrap";
import './createCampaignIntro'
import './CreateCampaignLast'
import CampaignLastPage from "./CreateCampaignLast";
import CampaignThirdPage from "./CreateCampaignThird";

function CreateCampaignVisuals(props) {

    React.useEffect(() =>{
        setLanguage(LanguageService.getLanguage());
    }, [])

    const [language, setLanguage] = React.useState('');
    const [isUploading, setIsUploading] = React.useState('');
    const [step, setStep] = React.useState(1)
    const totalSteps = 4;
    const nextStep = () => { 
        if (step < totalSteps + 1 ) {
            setStep(step => step + 1)
        }
    }

    const prevStep = () => { 
        if (step > 1 ) {
            setStep(step => step - 1)
        }
    }

    var EN;
    if(language === "en"){
        EN = true
    }else{
        EN = false
    }
    return(
        <div className='create-page'>
            {!EN ? <WhatsAppButton EN = {EN}></WhatsAppButton> : ''}
            <div id='background' >
            <MultiStepForm pillSize={50} activeStep={step} inactiveColor={'#999'}>
            <Step label={1}>                       
                <CampaignIntroPage EN={EN} handleChange={props.handleChange}></CampaignIntroPage>
            </Step>  
            <Step label={2}> 
                <CreatCampaignDetails EN={EN} data={props.data} handleChange={props.handleChange} setData={props.setData} setIsUploading={setIsUploading}/>
            </Step> 
            <Step label={3}>
                <CampaignThirdPage EN={EN} data={props.data} handleChange={props.handleChange} setData={props.setData}></CampaignThirdPage>
            </Step>     
            <Step label={4}>  
                <CampaignLastPage isUploading={isUploading} EN={EN} submit={props.submit}></CampaignLastPage>
            </Step>  
                </MultiStepForm>       
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
                
            <div className="center-btn">
                <Button onClick={prevStep} className="step-btn left-btn">{EN ? 'Previous' : 'Regresar'}</Button>
                <Button onClick={nextStep} className="step-btn right-btn">{EN ? 'Next' : 'Siguiente'}</Button>
            </div>


            </div>

        </div>
    )
}

export default CreateCampaignVisuals;