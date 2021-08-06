import React, {useState} from "react";
import {Card, CardContent} from "@material-ui/core";
import { MultiStepForm, Step } from 'react-multi-form';
import { Grid } from '@material-ui/core';
import CreatCampaignDetails from "./CreatCampaignDetails";
import './CreateCampaignPage.css'
// import background from '../../../pics/pattern-yakera-blue.png';

function CreateCampaignVisuals(props) {

    return(
        <div className='create-campaign-page'>
            <div id='background' >
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
                        <Step label="Details">
                            <CreatCampaignDetails data={props.data} handleChange={props.handleChange}/>
                        </Step>
            </div>
        </div>
    )
}

export default CreateCampaignVisuals;