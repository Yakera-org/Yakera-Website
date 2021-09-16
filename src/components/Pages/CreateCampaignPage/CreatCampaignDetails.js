import React from "react";
import classnames from 'classnames'
import {Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";

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
                        autocomplete="off" 
                        placeholder='Enter your campaign name'
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
                    <FormLabel>Amount (in USD)</FormLabel>
                    <FormControl
                        type='number'
                        as='input'
                        name='amount'
                        autocomplete="off" 
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
                    <FormLabel>Short Description</FormLabel>
                    <FormControl
                        type='description'
                        as="input"
                        autocomplete="off" 
                        name='description'
                        placeholder='Short description of your campaign'
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
                    <FormLabel>Your story (we recommend referencing your personal story, the need behind your campaign, why you are opening a campaign, how will you spend the money, and what will the support of people in Yakera allow you to do). Usually successful campaigns have between 3-6 paragraphs.</FormLabel>
                    <FormControl
                        type='story'
                        autocomplete="off" 
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
                        autocomplete="off" 
                        placeholder='Enter the amount (USD) and item descriptions'
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
                    <FormLabel>Documents that support your ask (i.e medical orders or notes, tuition receipt, pictures of your small business, budget, etc.)</FormLabel>
                    <FormControl
                        type="file"
                        multiple={true}
                        as='input'
                        name='supportDocs'
                        onChange={props.handleImageChange}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Main Campaign picture</FormLabel>
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
                    <FormLabel>Campaign pictures</FormLabel>
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