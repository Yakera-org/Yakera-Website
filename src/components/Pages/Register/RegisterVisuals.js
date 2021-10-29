import React, {useState} from "react";
import {Card, CardContent} from '@material-ui/core';
import { Alert} from 'reactstrap'
import { MultiStepForm, Step } from 'react-multi-form';
import { Grid } from '@material-ui/core';
import RegisterDetails from "./Register_details";
import RegisterAuth from "./Register_auth";
import RegisterConf from "./Register_confirmation";


import './RegisterPage.css'

function RegisterVisuals(props) {

    const [step, nextStep] = useState(1);
    const EN = props.EN

    async function onContinue() {
        if(await props.validate(step)){
            nextStep(step + 1)
        }
        if(step === 3){
            props.register();
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
            <div id='background' style={{ backgroundImage: `url(https://assets.yakera.org/yakera/pattern-yakera-blue.webp)`}}>
                    <Card className='login-card'>
                        <CardContent>

                            <h1>{EN ? 'Sign up with Yakera in 3 easy steps' : 'Regístrese a Yakera con tres pasos fáciles'}</h1>

                            <MultiStepForm activeStep={step} accentColor='#003049'>
                                <Step label={EN ? "Details" : 'Detalles'}>
                                    <RegisterDetails EN={EN} data={props.data} handleChange={props.handleChange}/>
                                </Step>

                                <Step label={EN ? "Authentication" : 'Autenticación'} >
                                    <RegisterAuth EN={EN} data={props.data} handleChange={props.handleChange}/>
                                </Step>

                                <Step label={EN ? "Confirmation" : 'Confirmación'} >
                                    <RegisterConf EN={EN} data={props.data} handleChange={props.handleChange}/>
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
                                            {EN ? 'Back' : 'Regresa'}
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
