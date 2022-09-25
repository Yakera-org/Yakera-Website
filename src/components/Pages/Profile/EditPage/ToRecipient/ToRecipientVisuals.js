import React, {useState} from "react";
import {Card, CardContent} from '@material-ui/core';
import { Alert} from 'reactstrap'
import { MultiStepForm, Step } from 'react-multi-form';
import { Grid } from '@material-ui/core';
import RegisterAuth from "../../../Register/Register_auth";
import { useBoolean } from "react-use-boolean";
import './ToRecipientPage.css'

function ToRecipientVisuals(props) {

    let step3ref = React.useRef()

    const [step, nextStep] = useState(1); //changed from 1 to 2
    const [isRecipient, actions] = useBoolean();
    const EN = props.EN

    async function onContinue() {
        if(await props.validate(step)){
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

                            <h1 style = {{fontSize : "30px"}}>{EN ? 'Change account type to recipient' : 'Cambiar tipo de cuenta al receptor'}</h1>

                            <MultiStepForm activeStep={step} accentColor='#003049'>
                                <Step>
                                    <RegisterAuth EN={EN} data={props.data} handleChange={props.handleChange}/>
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

                            <div className='register-confirmation'>

                                <div className='checks'>
                                    <input
                                        name="terms"
                                        type="checkbox"
                                        id='terms'
                                        checked={props.data.check.terms}
                                        onChange={props.handleChange}
                                    />
                                    <label htmlFor='terms'>
                                        {EN ? <>I have reviewed and agree to the <a href="terms" target="_blank" rel="noopener">terms and conditions</a> *</> : <>Estoy de acuerdo con los <a href="terms" target="_blank" rel="noopener">términos y condiciones</a> *</>}
                                    </label>
                                </div>
                            </div>

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
                                            {EN ? 'Confirm account type change' : 'Confirmar el cambio de tipo de cuenta'}
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                            :
                            ''
                            }

                        </CardContent>
                    </Card>
                </div>
        </div>
        
        
    )
}

export default ToRecipientVisuals
