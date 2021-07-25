import React from 'react';
import MyEditor from '../../generics/MyEditor';
import { Form, FormGroup, FormControl, FormLabel, Button, FormText, FormCheck } from 'react-bootstrap';
import './CreateCampaignPage.css'

const CreateCampaignPage = () => {
    return (
        <div className='create-page'        >
            <div className='create-header'>
                <h1>
                    Create your campaign
                </h1>
                <p>
                    Yakera is a crowdfunding platform that allows people to tell 
                    their stories and receive donations for healthcare, education, 
                    nutrition, and small business. We believe in people's dignity 
                    and ability to satisfy their own needs via direct transfers.
                </p>
                <p>
                    In this form you can tell us your story so that it's featured 
                    in Yakera's website and you can start receiving donations. 
                </p>
                <p>
                    If you have any questions, text us in WhatsApp at  +1 740-462-2212 
                    or +56 9 5699 7352 or at info@yakera.org. We are here to help you 
                    and answer any questions.
                </p>
                
            </div>
            <div 
                className='form' 
            >
                <Form>
                    <FormGroup>
                        <FormLabel>Campaign Category</FormLabel>
                        {['Healthcare', 'Education', 'Small Business', 'Nutrition'].map((val, index) => (
                            <FormCheck
                                key={index}
                                type='radio'
                                id={`category`}
                                label={val}
                                group='category'
                            />
                        ))}
                        
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Name of your Campaign</FormLabel>
                        <FormControl type='campaign-name' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Amount (in USD)</FormLabel>
                        <FormControl type='amount' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Your story (we recommend referencing your personal story, the need behind your campaign, why you are opening a campaign, how will you spend the money, and what will the support of people in Yakera allow you to do). Usually successful campaigns have between 3-6 paragraphs. </FormLabel>
                        <MyEditor />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Itemized budget for each item you will purchase with the donations</FormLabel>
                        <FormControl type='itemized-budget' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Pictures that support your ask (i.e medical orders or notes, tuition receipt, pictures of your small business, budget, etc.)</FormLabel>
                        <FormControl type='file' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Main Campaign picture</FormLabel>
                        <FormControl type='file' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Campaign pictures</FormLabel>
                        <FormControl type='file' as='input' />
                    </FormGroup>
                    <FormGroup>
                    <FormLabel>Campaign Category</FormLabel>
                        {['Yes', 'No'].map((val, index) => (
                            <FormCheck
                                key={index}
                                type='radio'
                                id={`terms-cond`}
                                label={val}
                                group='terms-cond'
                            />
                        ))}
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
};

export default CreateCampaignPage
