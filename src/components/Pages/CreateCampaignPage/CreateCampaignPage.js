import React from 'react';
import MyEditor from '../../generics/MyEditor';
import { Form, FormGroup, FormControl, FormLabel, Button, FormText, FormCheck } from 'react-bootstrap';

const CreateCampaignPage = () => {
    return (
        <div
            style={{
                margin: '150px'
            }}
        >
            <div className='page-header'>
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
                style={{
                    margin: '6rem'
                }}
            >
                <Form>
                    <FormGroup>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl type='full-name' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>ID</FormLabel>
                        <FormControl type='id' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl type='email' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Password with numbers, text and a special character. Example: Elefante1481#</FormLabel>
                        <FormControl type='password' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Airtm user</FormLabel>
                        <FormControl type='airtm' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Address</FormLabel>
                        <FormControl type='address' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl type='phone-number' as='input' />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Facebook User</FormLabel>
                        <FormControl type='fb-user' as='input' />
                    </FormGroup>
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
                        {/* <FormCheck 
                            type='radio'
                            label='Healthcare'
                            custom
                        />
                        <FormCheck 
                            type='radio'
                            label='Education'
                            custom
                        />
                        <FormCheck 
                            type='radio'
                            label='Small Business'
                        />
                        <FormCheck 
                            type='radio'
                            label='Nutrition'
                        /> */}
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
                    
                </Form>
            </div>
                {/* <MyEditor /> */}
        </div>
    )
};

export default CreateCampaignPage
