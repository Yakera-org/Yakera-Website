import React from "react";
import classnames from 'classnames'
import {FormControl, FormGroup, FormLabel} from "react-bootstrap";

function CreateCampaignDetails(props) {
    
    const EN = props.EN;
    const isMobile = props.isMobile;

    const handleTitleChange = (event) => {
        props.validations.validateTitle();

        return props.handleChange(event);
    };

    const handleAmountChange = (event) => {
        props.validations.validateAmount();

        return props.handleChange(event);
    }

    const handleDescriptionChange = (event) => {
        props.validations.validateDescription();

        return props.handleChange(event);
    }

    return(
        <div className='campaign-details'>
            {isMobile
            ?
            <h2 className="subtitle-text-mobile"><span>{EN ? 'Details' : 'Detalles'}</span></h2>
            :
            <h2 className="subtitle-text"><span>{EN ? 'Details' : 'Detalles'}</span></h2>
            }

            <FormGroup>
                <FormLabel className="question-label">{EN ? 'Name of your Campaign' : 'Título de la campaña'}</FormLabel>
                <FormControl
                    type='campaign-name'
                    as='input'
                    name='campaignname'
                    autoComplete="off"
                    placeholder={EN ? 'Enter a title that catches the attention of potential donors' : 'Escribe un título que llame la atención de donantes potenciales'}
                    onChange={handleTitleChange}
                    className={classnames(
                        'form-control',
                        {/*'is-valid': props.data.errors.campaignname === false*/},
                        {/*'is-invalid': props.data.errors.campaignname*/},
                        {'is-valid': (!props.errors.nameError && props.data.campaignname)},
                        {'is-invalid': props.errors.nameError}
                    )}
                />
                {/*<div className="invalid-feedback">{props.data.errors.campaignname}</div>*/}
                <div className="invalid-feedback invalid-data">{props.errors.nameError}</div>
            </FormGroup>
            <FormGroup>
                <FormLabel className="question-label">{EN ? 'Objective (in USD)' : 'Objetivo ($USD)'}</FormLabel>
                <FormControl
                    type='number'
                    as='input'
                    name='amount'
                    autoComplete="off"
                    placeholder={EN ? 'Enter the amount that you wish to raise (in USD)' : 'Llene con la cantidad que desea recaudar en $USD'}
                    onChange={handleAmountChange}
                    className={classnames(
                        'form-control',
                        {/*'is-valid': props.data.errors.amount === false*/},
                        {/*'is-invalid': props.data.errors.amount*/},
                        {'is-valid': (!props.errors.amountError && props.data.amount)},
                        {'is-invalid': props.errors.amountError}
                    )}
                />
                {/*<div className="invalid-feedback">{props.data.errors.amount}</div>*/}
                <div className="invalid-feedback invalid-data">{props.errors.amountError}</div>
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
                    onChange={handleDescriptionChange}
                    className={classnames(
                        'form-control',
                        {/*'is-valid': props.data.errors.description === false*/},
                        {/*'is-invalid': props.data.errors.description*/},
                        {'is-valid': (!props.errors.descriptionError && props.data.description)},
                        {'is-invalid': props.errors.descriptionError}
                    )}
                />
                {/*<div className="invalid-feedback">{props.data.errors.description}</div>*/}
                <div className="invalid-feedback invalid-data">{props.errors.descriptionError}</div>
            </FormGroup>

        </div>
    )
}

export default CreateCampaignDetails;