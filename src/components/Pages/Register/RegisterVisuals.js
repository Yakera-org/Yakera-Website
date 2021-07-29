import React, {useState} from "react";
import {Card, CardContent} from '@material-ui/core';
import { MultiStepForm, Step } from 'react-multi-form';
import { Grid } from '@material-ui/core';
import RegisterDetails from "./Register_details";
import RegisterAuth from "./Register_auth";
import RegisterConf from "./Register_confirmation";
import background from '../../../pics/pattern-yakera-blue.png'


import './RegisterPage.css'

function RegisterVisuals(props) {

    const [step, nextStep] = useState(1);

    function onContinue() {
        if(props.validate(step)){
            nextStep(step + 1)
        }
        if(step === 3){
            props.register();
        }
    }

    function onBack() {
        nextStep(step - 1);
    }

    return (
        <div className='register-page'>
            <div id='background' style={{ backgroundImage: `url(${background})`}}>
                    <Card className='login-card'>
                        <CardContent>

                            <h1>Sign up with Yakera in 3 easy steps</h1>

                            <MultiStepForm activeStep={step} accentColor='#003049'>
                                <Step label="Details">
                                    <RegisterDetails data={props.data} handleChange={props.handleChange}/>
                                </Step>

                                <Step label="Authentication" >
                                    <RegisterAuth data={props.data} handleChange={props.handleChange}/>
                                </Step>

                                <Step label="Confirmation" >
                                    <RegisterConf data={props.data} handleChange={props.handleChange}/>
                                </Step>

                            </MultiStepForm>
                            <br /> 

                            <Grid container spacing={1} style={{ alignItems:'flex-start'}}>
                                <Grid item xs={12} sm={6} >
                                { step > 1 
                                ?
                                    <div id='step-btn'>
                                        <button  onClick={onBack}>
                                            Back
                                        </button>
                                    </div>
                                :
                                    ''
                                }
                                </Grid>
                                <Grid item xs={12} sm={step === 1 ? 12 : 6} >
                                    <div id='step-btn'>
                                        <button  onClick={onContinue}>
                                            {step < 3 ? 'Continue' : 'Register'} 
                                        </button>
                                    </div>
                                </Grid>
                            </Grid> 
                        </CardContent>
                    </Card>
                </div>


        </div>
    )
}

export default RegisterVisuals
