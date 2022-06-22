import React from "react";
import classnames from 'classnames'
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";
import './CreateCampaignPage.css';

function CampaignThirdPage(props)
{
    let EN = props.EN;

    return (
        <div>
            <FormGroup>
                <FormLabel className="category-label">
                    {EN ? 'Tell us the situation that you want to resolve with your campaign' : 'Cuéntanos la situación que quieres resolver con la campaña'}
                </FormLabel>
                <p className="info-text">
                    {EN
                    ?
                    'Describe what made you open a campaign to raise funds and clearly comment the situation that you want to resolve.'
                    : 
                    'Describe que te llevó a abrir una campaña para recaudar fondos y comenta claramente la situación que deseas resolver.'}
                </p>
                <FormControl
                    type='story'
                    autoComplete="off" 
                    as="textarea"
                    name='story'
                    style={{minHeight:'100px'}}
                    placeholder={EN ? "I'm going through..." : 'Estoy atravesando...'}
                    // value={props.data.story}
                    onChange={props.handleChange}
                    className={classnames(
                        'form-control',
                        {'is-valid': props.data.errors.story === false},
                        {'is-invalid': props.data.errors.story }
                    )}
                />
                <div className="invalid-feedback">{props.data.errors.story}</div>
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
                    'Describe como crees que podrás resolver la situación con las donaciones y por qué esta campaña será de ayuda para ti.'}
                </p>
                <FormControl
                    type='public-story'
                    autoComplete="off" 
                    as="textarea"
                    name='public-story'
                    style={{minHeight:'100px'}}
                    placeholder={EN ? 'I need to get...' : 'Necesito conseguir...'}
                    // value={props.data.publicStory}
                    onChange={props.handleChange}
                    className={classnames(
                        'form-control',
                        {'is-valid': props.data.errors.publicStory === false},
                        {'is-invalid': props.data.errors.publicStory }
                    )}
                />
                <div className="invalid-feedback">{props.data.errors.publicStory}</div>
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
                    'Cuéntale a los demás en que usarás el dinero para que las personas tengan más conocimiento sobre qué estarán aportando.'}
                </p>
                <FormControl
                    type='money-use'
                    autoComplete="off" 
                    as="textarea"
                    name='money-use'
                    style={{minHeight:'100px'}}
                    placeholder={EN ? "With the money I'll get..." : 'Con el dinero que reciba...'}
                    // value={props.data.moneyUse}
                    onChange={props.handleChange}
                    className={classnames(
                        'form-control',
                        {'is-valid': props.data.errors.moneyUse === false},
                        {'is-invalid': props.data.errors.moneyUse }
                    )}
                />
                <div className="invalid-feedback">{props.data.errors.moneyUse}</div>
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
                    // value={props.data.itemizedBudget}
                    onChange={props.handleChange}
                    className={classnames(
                        'form-control',
                        {'is-valid': props.data.errors.itemizedbudget === false},
                        {'is-invalid': props.data.errors.itemizedbudget }
                    )}
                />
                <div className="invalid-feedback">{props.data.errors.itemizedbudget}</div>
            </FormGroup>
        </div>
    );
}

export default CampaignThirdPage;
