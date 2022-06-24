import React, { useState, useEffect } from "react";
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
import CampaignSummary from "./CreateCampaignSummary.js";

function CreateCampaignVisuals(props) {
    const [width, setWidth] = useState(window.innerWidth);

    let isMobile = width < 700 ? true : false;

    const handleWindowSize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() =>{
        setLanguage(LanguageService.getLanguage());

        window.addEventListener('resize', handleWindowSize);
        return () => window.removeEventListener('resize', handleWindowSize);
    }, [])

    
    const [language, setLanguage] = useState('');
    const [isUploading, setIsUploading] = useState('');
    const [step, setStep] = useState(1)
    const totalSteps = 4;
    const nextStep = () => { 
        if (step < totalSteps + 1 ) {
            setStep(step => step + 1)
        }
    }
    
    useEffect(() => {
        window.scrollTo(0,0)
    }, [step])
    
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

    return (
        <div className='create-page'>
            {!EN ? <WhatsAppButton EN = {EN}></WhatsAppButton> : ''}
            <div id='background' >
            <MultiStepForm pillSize={50} activeStep={step} inactiveColor={'#999'}>
                <Step label={1}>
                    <CampaignIntroPage EN={EN} handleChange={props.handleChange} isMobile={isMobile} />
                </Step>
                <Step label={2}>
                    <CreatCampaignDetails EN={EN} data={props.data} handleChange={props.handleChange} setData={props.setData} setIsUploading={setIsUploading} isMobile={isMobile} />
                </Step>
                <Step label={3}>
                    <CampaignThirdPage EN={EN} data={props.data} handleChange={props.handleChange} setData={props.setData} isMobile={isMobile} />
                </Step>
                <Step label={4}>  
                  <CampaignLastPage EN={EN} data={props.data} handleChange={props.handleChange} setData={props.setData} setIsUploading={setIsUploading} isMobile={isMobile} />
                </Step> 
            </MultiStepForm>
            <CampaignSummary step={step} data={props.data} EN={EN} isMobile={isMobile} />
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
                {
                    step > 1
                    ?
                    <Button onClick={prevStep} className="step-btn left-btn">{EN ? 'Previous' : 'Regresar'}</Button>
                    :
                    ''
                }
                {
                    step < 5
                    ?
                    <Button onClick={nextStep} className="step-btn right-btn">{EN ? 'Next' : 'Siguiente'}</Button>
                    :
                    ''
                }
                {
                    step === 5
                    ?
                    (
                        isUploading
                        ?
                        <Button onClick={props.submit} id="disabled-create" disabled={true} style={{backgroundColor:'grey'}} className="step-btn right-btn">{EN ? 'Create Campaign' : 'Crear Campaña'}</Button>
                        :
                        <Button onClick={props.submit} className="step-btn right-btn">{EN ? 'Finish' : 'Finalizar'}</Button>
                    )
                    :
                    ''
                }
            </div>


            </div>

        </div>
    );
}

export default CreateCampaignVisuals;
