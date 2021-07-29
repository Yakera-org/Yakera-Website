import React, {useState} from "react";
import {Card, CardContent} from '@material-ui/core';
import { MultiStepForm, Step } from 'react-multi-form';
import RegisterDetails from "./Register_details";
import RegisterAuth from "./Register_auth";
import RegisterConf from "./Register_confirmation";
import background from '../../../pics/pattern-yakera-blue.png'

import './RegisterPage.css'

function RegisterVisuals(props) {

    const [step, nextStep] = useState(1);

    function onContinue() {
        console.log(props.data)
        if(props.validate(step)){
            nextStep(step + 1)
        }
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
                            <div id='step-btn'>
                                <button  onClick={onContinue}>
                                    Continue 
                                </button>
                            </div>

                        </CardContent>
                    </Card>
                </div>


        </div>
    )
}

export default RegisterVisuals
