import React, {useState} from "react";
import {Card, CardContent} from '@material-ui/core';
import { Alert} from 'reactstrap'
import { MultiStepForm, Step } from 'react-multi-form';
import { Grid } from '@material-ui/core';
import RegisterDetails from "./Register_details";
import RegisterAuth from "./Register_auth";
import RegisterConf from "./Register_confirmation";
import { useBoolean } from "react-use-boolean";


import './RegisterPage.css'
import RegisterAuthDonor from "./Register_auth_donor";

function RegisterVisuals(props) {

    let step3ref = React.useRef()

    const [step, nextStep] = useState(1);
    const [isRecipient, actions] = useBoolean();
    const EN = props.EN

    async function onContinue() {
        if(step === 1){
            if(await props.validate(step)){
                nextStep(step + 1)
            }
        }
        if(step === 2){
            if(isRecipient){
                if(await props.validate(step)){
                    nextStep(step + 1)
                }
            }else{
                nextStep(step + 1)
            }
            window.scrollTo({ behavior: 'smooth', top: step3ref})
        }
        if(step === 3){
            props.register(isRecipient);
        }
    }

    function onBack() {
        props.setError({
            ...props.data,
            error: ''
        })
        nextStep(step - 1);
    }

    return (
        <div className='register-page'>
            <div id='background'>
                    <Card id='card' className='register-card'>
                        <CardContent>

                            <h1 style = {{fontSize : "30px"}}>{EN ? 'Join the Yakera community in 3 easy steps' : 'Únete a la comunidad de Yakera en 3 simples pasos'}</h1>

                            <MultiStepForm activeStep={step} accentColor='#003049'>
                                <Step label={EN ? "Details" : 'Detalles'}>
                                    <RegisterDetails EN={EN} data={props.data} handleChange={props.handleChange}/>
                                    <DetailsSwitch EN={EN} isRecipient={isRecipient} actions={actions}/>
                                </Step>

                                <Step label={EN 
                                            ? 
                                            isRecipient ? "Authentication" : 'Profile'
                                            : 
                                            !isRecipient ? "Perfil" : "Autenticación"
                                            } >
                                    {isRecipient
                                        ?
                                        <RegisterAuth EN={EN} data={props.data} handleChange={props.handleChange}/>
                                        :
                                        <RegisterAuthDonor EN={EN} data={props.data} handleChange={props.handleChange}/>
                                    }
                                </Step>

                                <Step label={EN ? "Confirmation" : 'Confirmación'} >
                                    <RegisterConf EN={EN} data={props.data} handleChange={props.handleChange} ref={step3ref}/>
                                </Step>

                            </MultiStepForm>
                            <br />
                            { props.error
                            ?
                                <Alert color="danger">
                                    { props.error }
                                </Alert>
                            :
                            ''
                            }
                            { props.success
                            ?
                                <Alert color="success">
                                    { props.success }
                                    <div style={{fontSize:'15px'}}>
                                        { EN ? 'Please make sure to check your spam folder.' : 'Asegúrese de revisar su carpeta de correo no deseado.' }
                                    </div>
                                </Alert>
                            :
                            ''
                            }

                           {
                            !props.success
                            ?
                            <Grid container spacing={1} style={{ alignItems:'flex-start'}}>
                                <Grid item xs={12} sm={6} >
                                { step > 1
                                ?
                                    <div id='step-btn'>
                                        <button  onClick={onBack}>
                                            {EN ? 'Back' : 'Regresar'}
                                        </button>
                                    </div>
                                :
                                    ''
                                }
                                </Grid>
                                <Grid item xs={12} sm={step === 1 ? 12 : 6} >
                                    <div id='step-btn'>
                                        <button  onClick={onContinue}>
                                            {step < 3 ? EN ? 'Continue' : 'Continuar' : EN ? 'Register' : 'Registrarse'}
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                            :
                            ''
                            }

                            <br />
                            {EN ? <p>Already have an account? Log in <a href='/login'>here</a></p>
                             :
                             <p>¿Ya tiene una cuenta? Iniciar sesión <a href='/login'>aqui</a></p>}

                        </CardContent>
                    </Card>
                </div>
        </div>
    )
}

export default RegisterVisuals



export function DetailsSwitch(props) {
    var isRecipient = props.isRecipient
    var actions = props.actions
    const EN = props.EN
    return (
    <div className="switch-area">
        {EN
            ? <p>I am a {isRecipient ? <b>Recipient</b> : <b>Donor</b>} </p>
            : <p>Soy un {isRecipient ? <b>Beneficiaro</b> : <b>Donante</b>} </p>
        }

        <div className="switch">
            <button id="left" className={isRecipient ? "on" : "off"} onClick={actions.on}>{EN ? 'Recipient' : 'Beneficiaro'}</button>
            <button id="right" className={isRecipient ? "off" : "on"} onClick={actions.off}>{EN ? 'Donor' : 'Donante'}</button>
        </div>
    </div>
    );
};
