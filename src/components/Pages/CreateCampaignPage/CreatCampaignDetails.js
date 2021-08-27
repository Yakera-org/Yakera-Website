import React from "react";
import classnames from 'classnames'
import { Grid } from '@material-ui/core';
import {Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import MyEditor from "../../generics/MyEditor";

function CreateCampaignDetails(props) {
    return(
        <div className='campaign-details'>
            <h2>Details</h2>
            <hr />

            <Form container='true' spacing={3} style={{ alignItems:'flex-start' }}>
                <FormGroup item='true' xs={12} sm={6}>
                    <FormLabel>Campaign Category</FormLabel>
                    {['Healthcare', 'Education', 'Small Business', 'Nutrition'].map((val, index) => (
                        <FormCheck
                            key={index}
                            name={'campaigncategory'}
                            value={val.toLowerCase()}
                            type='radio'
                            id={`category`}
                            label={val}
                            group='category'
                            // defaultChecked= {props.data.campaignCategory}
                            onChange={props.handleChange}
                        />
                    ))}
                </FormGroup>
                <FormGroup>
                    <FormLabel>Name of your Campaign</FormLabel>
                    <FormControl
                        type='campaign-name'
                        as='input'
                        name='campaignname'
                        placeholder='Enter your campaign name'
                        // value={props.data.campaignName}
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
                        type='number'
                        as='input'
                        name='amount'
                        placeholder='Enter the amount (USD)'
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
                    <FormLabel>Your story (we recommend referencing your personal story, the need behind your campaign, why you are opening a campaign, how will you spend the money, and what will the support of people in Yakera allow you to do). Usually successful campaigns have between 3-6 paragraphs.</FormLabel>
                    <FormControl
                        type='story'
                        as="textarea"
                        name='story'
                        style={{minHeight:'100px'}}
                        placeholder='Tell us your story'
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
                    <FormLabel>Itemized budget for each item you will purchase with the donations</FormLabel>
                    <FormControl
                        type='itemized-budget'
                        as='textarea'
                        name='itemizedbudget'
                        placeholder='Enter the amount (USD) and item descriptions'
                        // value={props.data.itemizedBudget}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            {'is-valid': props.data.errors.itemizedBudget === false},
                            {'is-invalid': props.data.errors.itemizedBudget }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.itemizedBudget}</div>
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Documents that support your ask (i.e medical orders or notes, tuition receipt, pictures of your small business, budget, etc.)</FormLabel>
                    <FormControl
                        type="file"
                        multiple
                        as='input'
                        name='documents'
                        placeholder='Choose files'
                        // value={props.data.supportDocuments}
                        onChange={props.handleChange}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Main Campaign picture</FormLabel>
                    <FormControl
                        type="file"
                        as='input'
                        name='mainpic'
                        placeholder='Choose files'
                        // value={props.data.supportDocuments}
                        onChange={props.handleChange}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Campaign pictures</FormLabel>
                    <FormControl
                        type="file"
                        as='input'
                        name='campaignpics'
                        placeholder='Choose files'
                        // value={props.data.supportDocuments}
                        onChange={props.handleChange}
                    />
                </FormGroup>
            </Form>

        </div>
    )
}

export default CreateCampaignDetails;