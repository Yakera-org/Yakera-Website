import React from "react";
import classnames from 'classnames'
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";

function CreateCampaignDetails(props) {
    
    const EN = props.EN

    return(
        <div className='campaign-details'>
            <h2 className="subtitle-text">
                <span>{EN ? 'Details' : 'Detalles'}</span>
            </h2>

            <FormGroup>
                <FormLabel className="question-label">{EN ? 'Name of your Campaign' : 'Título de la campaña'}</FormLabel>
                <FormControl
                    type='campaign-name'
                    as='input'
                    name='campaignname'
                    autoComplete="off"
                    placeholder={EN ? 'Enter a title that catches the attention of potential donors' : 'Escribe un título que llame la atención de donantes potenciales'}
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
                <FormLabel className="question-label">{EN ? 'Objective (in USD)' : 'Objetivo ($USD)'}</FormLabel>
                <FormControl
                    type='number'
                    as='input'
                    name='amount'
                    autoComplete="off"
                    placeholder={EN ? 'Enter the amount that you wish to raise (in USD)' : 'Llene con la cantidad que desea recaudar en $USD'}
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
                <p className="info-text">
                    {EN
                    ?
                    'The description is the first thing that will be read in the Campaigns section. Write in one or two sentences the main problem of your campaign so that it can attract potential donors.'
                    : 
                    'La descripción es lo que las personas leerán primero en la sección de Campañas. Escribe en una o dos oraciones el problema principal de tu campaña para atraer la atención de donantes potenciales.'}
                </p>
                <FormControl
                    type='description'
                    as="textarea"
                    autoComplete="off" 
                    style={{minHeight:'100px'}}
                    name='description'
                    placeholder={EN ? 'Description...' : 'Descripción...'}
                    onChange={props.handleChange}
                    className={classnames(
                        'form-control',
                        {'is-valid': props.data.errors.description === false},
                        {'is-invalid': props.data.errors.description }
                    )}
                />
                <div className="invalid-feedback">{props.data.errors.description}</div>
            </FormGroup>

        </div>
    )
}

export default CreateCampaignDetails;