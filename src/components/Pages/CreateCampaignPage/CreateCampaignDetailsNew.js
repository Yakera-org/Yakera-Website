import React from "react";
import classnames from 'classnames'
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";

function CreateCampaignDetails(props) {
    
    const EN = props.EN

    return(
        <div className='campaign-details'>
            <h2>
                {EN ? 'Details' : 'Detalles'}
            </h2>
            <hr />

            <Form container='true' spacing={3} style={{ alignItems:'flex-start' }}>
                <FormGroup>
                    <FormLabel className="question-label">{EN ? 'Name of your Campaign' : 'Título de su campaña'}</FormLabel>
                    <FormControl
                        type='campaign-name'
                        as='input'
                        name='campaignname'
                        autoComplete="off" 
                        placeholder={EN ? 'Enter your campaign name' : 'Llene el título de su campaña'}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.campaignname === false},
                            {'is-invalid': props.data.errors.campaignname }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.campaignname}</div>
                </FormGroup>
                <FormGroup>
                    <FormLabel className="question-label">{EN ? 'Amount (in USD)' : 'Cantidad ($USD)'}</FormLabel>
                    <FormControl
                        type='number'
                        as='input'
                        name='amount'
                        autoComplete="off" 
                        placeholder={EN ? 'Enter the amount (USD)' : 'Llene con la cantidad de su campaña en $USD'}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.amount === false},
                            {'is-invalid': props.data.errors.amount }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.amount}</div>
                </FormGroup>
                <FormGroup>
                    <FormLabel className="question-label">{EN ? 'Short Description' : 'Breve descripción'}</FormLabel>
                    <FormControl
                        type='description'
                        as="input"
                        autoComplete="off" 
                        name='description'
                        placeholder={EN ? 'Short description of your campaign' : 'Breve descripción de su campaña'}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.description === false},
                            {'is-invalid': props.data.errors.description }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.description}</div>
                </FormGroup>
            </Form>

        </div>
    )
}

export default CreateCampaignDetails;