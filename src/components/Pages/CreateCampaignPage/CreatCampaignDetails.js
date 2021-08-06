import React from "react";
import classnames from 'classnames'
import { Grid } from '@material-ui/core';
import {Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import MyEditor from "../../generics/MyEditor";

function CreateCampaignDetails(props) {
    return(
        <div className='campaign-details'>
            <h2>Detais</h2>
            <hr />

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
                            checked={props.data.campaignCategory}
                            onChange={props.handleChange}
                        />
                    ))}
                </FormGroup>
                <FormGroup>
                    <FormLabel>Name of your Campaign</FormLabel>
                    <FormControl
                        type='campaign-name'
                        as='input'
                        placeholder='Enter your campaign name'
                        value={props.data.campaignName}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.campaignName === false},
                            {'is-invalid': props.data.errors.campaignName }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.campaignName}</div>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Amount (in USD)</FormLabel>
                    <FormControl
                        type='amount'
                        as='input'
                        placeholder='Enter the amount (USD)'
                        value={props.data.amount}
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
                    <FormLabel>Your story (we recommend referencing your personal story, the need behind your campaign, why you are opening a campaign, how will you spend the money, and what will the support of people in Yakera allow you to do). Usually successful campaigns have between 3-6 paragraphs.</FormLabel>
                    <FormControl
                        type='story'
                        as='input'
                        placeholder='Tell us your story'
                        value={props.data.story}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.story === false},
                            {'is-invalid': props.data.errors.story }
                        )}
                    />
                    <MyEditor />
                    <div className="invalid-feedback">{props.data.errors.story}</div>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Itemized budget for each item you will purchase with the donations</FormLabel>
                    <FormControl
                        type='itemized-budget'
                        as='input'
                        placeholder='Enter the amount (USD)'
                        value={props.data.itemizedBudget}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.itemizedBudget === false},
                            {'is-invalid': props.data.errors.itemizedBudget }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.itemizedBudget}</div>
                </FormGroup>
            </Form>

        </div>
    )
}

export default CreateCampaignDetails;