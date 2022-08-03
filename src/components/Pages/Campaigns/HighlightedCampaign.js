import React from 'react';
import { Grid } from '@material-ui/core';

function HighlightedCampaign(props) {
    const EN = props.EN
    const noNullDonations = props.campaign?.donations?.filter(element => {
      return element !== null;
    });
    const numberOfDonations = noNullDonations.length
    const campaign = {
        picture: props.campaign?.mainPicture?.url || "",
        slug: props.campaign?.slug || "",
        anon: noNullDonations[numberOfDonations - 1]?.isAnonymous || false,
        donationName: noNullDonations[numberOfDonations - 1]?.name?.split(" ")[0] || "",
        donationAmount: noNullDonations[numberOfDonations - 1]?.amount || "",
        donationComment: noNullDonations[numberOfDonations - 1]?.comment || "",
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
                                <b> {campaign.anon ? 'Anonymous' : campaign.donationName} </b> <br />
                                {campaign.donationComment ? '"' + campaign.donationComment + '"' : EN ? 'Most recent donor' : 'Donante más reciente'}
                            </div>
                        </div>
                        <div className='bubble-digit'>
                            ${campaign.donationAmout} USD
                        </div>
                    </div>
                </Grid>
            </Grid>
    );
}

export default HighlightedCampaign;
