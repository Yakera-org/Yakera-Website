import React from 'react';
import { Grid } from '@material-ui/core';

function HighlightedCampaign(props) {
    const EN = props.EN
    console.log(props.campaign)
    const numberOfCampaigns = props.campaign?.donations?.length 
    const campaign = {
        picture: props.campaign?.mainPicture?.url || "",
        slug: props.campaign?.slug || "",
        donationName: props.campaign?.donations[numberOfCampaigns - 1]?.name?.split(" ")[0] || "...",
        donationAmout: props.campaign?.donations[numberOfCampaigns - 1]?.amount || "...",
        donationComment: props.campaign?.donations[numberOfCampaigns - 1]?.comment || "...",
    }

    return (
            <Grid container spacing={0} className="grid-header" style={{ alignItems: 'flex-start' }}>
                <Grid item xs={6} sm={6} className='header-mid-img'>
                    <div className='image-top'>
                        {
                            EN ? <>Campaign of the <b>week</b></>: <>Campaña de la <b>Semana</b></>
                        }
                    </div>
                    <img alt='donate-figure' src={campaign.picture} onClick={() => window.location = `/campaign/${campaign.slug}` }/>
                </Grid>

                <Grid item xs={6} sm={6} className='mid-content'>
                    <div className='main-text'>
                        <b>{EN ? 'Support a story, ' : 'Apoya una historia, '}</b>
                        <span>{EN ? 'change a life.' : 'cambia una vida.'}</span>
                    </div>
                                
                    <div className='bubble-text'>
                        <div className='bubble-quote'>
                            <img alt='donate-figure' src="https://assets.yakera.org/yakera/profile-icon-1.webp" />
                            <div id="text">
                                <b> {campaign.donationName} </b> <br />
                                {campaign.donationComment}
                            </div>
                        </div>
                        <div className='bubble-digit'>
                            ${campaign.donationAmout}
                        </div>
                    </div>
                </Grid>
            </Grid>
    );
}

export default HighlightedCampaign;