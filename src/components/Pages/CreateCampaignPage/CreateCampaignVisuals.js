import React from "react";
import CreatCampaignDetails from "./CreatCampaignDetails";
import './CreateCampaignPage.css'
// import background from '../../../pics/pattern-yakera-blue.png';

function CreateCampaignVisuals(props) {

    return(
        <div className='create-page'>
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
                    If you have any questions, text us in WhatsApp at  <b>+1 740-462-2212 </b> 
                    or <b>+56 9 5699 7352</b> or at <b>info@yakera.org</b>. We are here to help you
                    and answer any questions.
                </p>
                
                <CreatCampaignDetails data={props.data} handleChange={props.handleChange} handleImageChange={props.handleImageChange}/>
                <div id='create-campaign'>
                    <button  onClick={props.submit}>
                        Create Campaign
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateCampaignVisuals;