import React from "react";
import classnames from 'classnames'
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import './CreateCampaignPage.css';

function CampaignThirdPage(props)
{
    let EN = props.EN;
    let isMobile = props.isMobile;

    const handleTextAreaChange = (event, validation) => {
        validation();

        return props.handleChange(event);
    }

    return (
        <div>
            {isMobile
            ?
            <h2 className="subtitle-text-mobile"><span>{EN ? 'Tell us your story' : 'Cuéntanos tu historia'}</span></h2>
            :
            <h2 className="subtitle-text"><span>{EN ? 'Tell us your story' : 'Cuéntanos tu historia'}</span></h2>
            }
            <p className="info-text">
                {EN
                ?
                "We'll ask for as much detail as possible so people can understand your campaign and genuinely connect with your story. Remember that "
                :
                'Te pediremos la mayor cantidad de detalles posibles para que las personas puedan entender tu campaña y conectar genuinamente con tu historia. Recuerda que '}
                <strong>
                    {EN
                    ?
                    'being transparent and authentic can help you receive more support.'
                    :
                    'ser transparente y auténtico puede ayudarte a recibir más apoyo.'}
                </strong>
            </p>
            <FormGroup>
                <FormLabel className="category-label">
                    {EN ? 'Tell us the situation that you want to resolve with your campaign' : 'Cuéntanos la situación que quieres resolver con la campaña'}
                </FormLabel>
                <p className="info-text">
                    {EN
                    ?
                    'Describe what made you open a campaign to raise funds and clearly comment the situation that you want to resolve.'
                    : 
                    'Describe qué te llevó a abrir una campaña para recaudar fondos y comenta claramente la situación que deseas resolver.'}
                </p>
                <FormControl
                    type='story'
                    autoComplete="off" 
                    as="textarea"
                    name='story'
                    style={{minHeight:'100px'}}
                    placeholder={EN ? "I'm going through..." : 'Estoy atravesando...'}
                    // value={props.data.story}
                    onChange={(event) => handleTextAreaChange(event, props.validations.validateStory)}
                    className={classnames(
                        'form-control',
                        {/*'is-valid': props.data.errors.story === false*/},
                        {/*'is-invalid': props.data.errors.story*/},
                        {'is-valid': (!props.errors.storyError && props.data.story)},
                        {'is-invalid': props.errors.storyError}
                    )}
                />
                {/*<div className="invalid-feedback">{props.data.errors.story}</div>*/}
                <div className="invalid-feedback invalid-data">{props.errors.storyError}</div>
            </FormGroup>

            <FormGroup>
                <FormLabel className="category-label">
                    {EN ? 'Tell everyone else, what do you need to improve your situation?' : 'Cuéntale a los demás, ¿qué necesitas para avanzar en tu situación?'}
                </FormLabel>
                <p className="info-text">
                    {EN
                    ?
                    'Describe how do you think you will be able to fix the situation with the donations and why this campaign would be useful to you.'
                    : 
                    'Describe cómo crees que podrás resolver la situación con las donaciones y por qué esta campaña será de ayuda para ti.'}
                </p>
                <FormControl
                    type='publicStory'
                    autoComplete="off" 
                    as="textarea"
                    name='publicStory'
                    style={{minHeight:'100px'}}
                    placeholder={EN ? 'I need to get...' : 'Necesito conseguir...'}
                    // value={props.data.publicstory}
                    onChange={(event) => handleTextAreaChange(event, props.validations.validatePublicStory)}
                    className={classnames(
                        'form-control',
                    {/*'is-valid': props.data.errors.publicStory === false*/},
                    {/*'is-invalid': props.data.errors.publicStory*/},
                    {'is-valid': (!props.errors.publicStoryError && props.data.publicstory)},
                    {'is-invalid': props.errors.publicStoryError}
                    )}
                />
                {/*<div className="invalid-feedback">{props.data.errors.publicStory}</div>*/}
                <div className="invalid-feedback invalid-data">{props.errors.publicStoryError}</div>
            </FormGroup>

            <FormGroup>
                <FormLabel className="category-label">
                    {EN ? 'What will you do with the money that you receive?' : '¿Qué harás con el dinero que recibas?'}
                </FormLabel>
                <p className="info-text">
                    {EN
                    ?
                    'Tell evryone else what will ypu use the money for, so that people have more knowledge about what they are contributing to.'
                    : 
                    'Cuéntale a los demás en qué usarás el dinero para que las personas tengan más conocimiento sobre qué estarán aportando.'}
                </p>
                <FormControl
                    type='moneyUse'
                    autoComplete="off" 
                    as="textarea"
                    name='moneyUse'
                    style={{minHeight:'100px'}}
                    placeholder={EN ? "With the money I'll get..." : 'Con el dinero que reciba...'}
                    // value={props.data.moneyuse}
                    onChange={(event) => handleTextAreaChange(event, props.validations.validateMoneyUse)}
                    className={classnames(
                        'form-control',
                        {/*'is-valid': props.data.errors.moneyUse === false*/},
                        {/*'is-invalid': props.data.errors.moneyUse*/},
                        {'is-valid': (!props.errors.moneyUseError && props.data.moneyuse)},
                        {'is-invalid': props.errors.moneyUseError}
                    )}
                />
                {/*<div className="invalid-feedback">{props.data.errors.moneyUse}</div>*/}
                <div className="invalid-feedback invalid-data">{props.errors.moneyUseError}</div>
            </FormGroup>

            <FormGroup>
                <FormLabel className="category-label">
                    {EN ? 'Itemized budget for each item you will purchase with the donations.' : 'Presupuesto específico de cada cosa que comprarás con los fondos.'}
                </FormLabel>
                <p className="info-text">
                    {EN 
                     ?
                     'Make a list of the things that you will buy with an estimated price (USD). This information helps Yakera verify your campaign and will not be published on the site.'
                     :
                     'Haz una lista de las cosas que comprarás con sus precios estimados en $USD. Esta información ayuda a Yakera a verificar tu campaña y no será publicada en el sitio.'}
                </p>
                <FormControl
                    type='itemized-budget'
                    as='textarea'
                    name='itemizedbudget'
                    autoComplete="off" 
                    style={{minHeight:'100px'}}
                    placeholder={EN ? 'Enter the amount (USD) and item descriptions' : 'Llene con las cosas que comprará y los precios en $USD'}
                    // value={props.data.itemizedbudget}
                    onChange={(event) => handleTextAreaChange(event, props.validations.validateBudget)}
                    className={classnames(
                        'form-control',
                        {/*'is-valid': props.data.errors.itemizedbudget === false*/},
                        {/*'is-invalid': props.data.errors.itemizedbudget*/},
                        {'is-valid': (!props.errors.budgetError && props.data.itemizedbudget)},
                        {'is-invalid': props.errors.budgetError}
                    )}
                />
                {/*<div className="invalid-feedback">{props.data.errors.itemizedbudget}</div>*/}
                <div className="invalid-feedback invalid-data">{props.errors.budgetError}</div>
            </FormGroup>
        </div>
    );
}

export default CampaignThirdPage;
