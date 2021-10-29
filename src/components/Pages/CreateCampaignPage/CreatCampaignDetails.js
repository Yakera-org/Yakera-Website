import React from "react";
import classnames from 'classnames'
import {Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";

function CreateCampaignDetails(props) {

    const EN = props.EN
    return(
        <div className='campaign-details'>
            <h2>
                {EN ? 'Details' : 'Detalles'}
            </h2>
            <hr />

            <Form container='true' spacing={3} style={{ alignItems:'flex-start' }}>
                <FormGroup item='true' xs={12} sm={6}>
                    <FormLabel>
                        {EN ? 'Campaign Category' : 'Categoría de campaña'}
                    </FormLabel>
                    {[EN ? 'Healthcare' : 'Salud',
                     EN ? 'Education' : 'Educación',
                     EN ? 'Small Business' : 'Pequeños negocios',
                     EN ? 'Nutrition' : 'Alimentación'].map((val, index) => (
                        <FormCheck
                            key={index}
                            name={'campaigncategory'}
                            value={val.toLowerCase()}
                            type='radio'
                            id={`category${index}`}
                            label={val}
                            group='category'
                            // defaultChecked= {props.data.campaignCategory}
                            onChange={props.handleChange}
                        />
                    ))}
                </FormGroup>
                <FormGroup>
                    <FormLabel>{EN ? 'Name of your Campaign' : 'Título de su campaña'}</FormLabel>
                    <FormControl
                        type='campaign-name'
                        as='input'
                        name='campaignname'
                        autoComplete="off" 
                        placeholder={EN ? 'Enter your campaign name' : 'Llene el título de su campaña'}
                        // value={props.data.campaignName}
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
                    <FormLabel>{EN ? 'Amount (in USD)' : 'Cantidad ($USD)'}</FormLabel>
                    <FormControl
                        type='number'
                        as='input'
                        name='amount'
                        autoComplete="off" 
                        placeholder={EN ? 'Enter the amount (USD)' : 'Llene con la cantidad de su campaña en $USD'}
                        // value={props.data.amount}
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
                    <FormLabel>{EN ? 'Short Description' : 'Breve descripción'}</FormLabel>
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
                <FormGroup>
                    <FormLabel>
                        {EN ? 'Your story (we recommend referencing your personal story, the need behind your campaign, why you are opening a campaign, how will you spend the money, and what will the support of people in Yakera allow you to do). Usually successful campaigns have between 3-6 paragraphs.' : 'Su historia (recomendamos se refiera a su propia historia, las necesidades que quiere cubrir con los fondos, por qué está abriendo una campaña, cómo va a gastar los fondos, y qué podrá hacer con los fondos). Escriba de 2 a 6 párrafos añadiendo detalles.'}
                    </FormLabel>
                    <FormControl
                        type='story'
                        autoComplete="off" 
                        as="textarea"
                        name='story'
                        style={{minHeight:'100px'}}
                        placeholder={EN ? 'Tell us your story' : 'Cuéntanos su historia'}
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
                    <FormLabel>{EN ? 'Itemized budget for each item you will purchase with the donations.' : 'Presupuesto específico de cada cosa que comprará con los fondos.'}</FormLabel>
                    <FormControl
                        type='itemized-budget'
                        as='textarea'
                        name='itemizedbudget'
                        autoComplete="off" 
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
                <FormGroup className="mb-3">
                    <FormLabel>{EN ? 'Documents that support your ask (i.e medical orders or notes, tuition receipt, pictures of your small business, budget, etc.)' : 'Documentos que apoyen su aplicación (historia médica, récipe médico, fotos de su negocio pequeño, etc.)'}</FormLabel>
                    <FormControl
                        type="file"
                        multiple={true}
                        as='input'
                        name='supportDocs'
                        onChange={props.handleImageChange}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>{EN ? 'Main Campaign picture' : 'Fotos de usted y su familia'}</FormLabel>
                    <FormControl
                        type="file"
                        as='input'
                        name='mainPicture'
                        accept='image/*'
                        multiple={true}
                        onChange={props.handleImageChange}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>{EN ? 'Campaign pictures' : 'Otras fotos de la campaña'}</FormLabel>
                    <FormControl
                        type="file"
                        multiple={true}
                        as='input'
                        name='pictures'
                        accept='image/*'
                        onChange={props.handleImageChange}
                    />
                </FormGroup>
            </Form>

        </div>
    )
}

export default CreateCampaignDetails;