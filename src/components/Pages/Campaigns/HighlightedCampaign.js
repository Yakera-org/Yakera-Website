import React from 'react';
import { Grid } from '@material-ui/core';

function HighlightedCampaign(props) {
    const EN = props.EN
    const campaign = props.campaign
    const hasLoaded = Object.entries(props.campaign).length !== 0 

    return (
            <Grid container spacing={0} className="grid-header" style={{ alignItems: 'flex-start' }}>
                <Grid item xs={6} sm={6} className='header-mid-img'>
                    <h2>
                        {
                            EN ? "Campaign of the week": "Campaign of the week"
                        }
                    </h2>
                    <img alt='donate-figure' src={hasLoaded ? campaign?.mainPicture?.url : ""} onClick={() => window.location = `/campaign/${hasLoaded ? campaign?.slug : "..."}` }/>
                </Grid>

                <Grid item xs={6} sm={6} className='mid-content'>
                    <div className='main-text'>
                        <b>{EN ? 'Support a story, ' : 'Apoya una historia, '}</b>
                        <span>{EN ? 'change a life' : 'cambia una vida'}</span>
                    </div>
                                
                    <div className='bubble-text'>
                        <div className='bubble-quote'>
                            <img alt='donate-figure' src="https://assets.yakera.org/yakera/profile-icon-1.webp" />
                            <b> {hasLoaded ? campaign?.donations[2]?.name.split(" ")[0] : "..."} </b> <br />
                            { hasLoaded ? campaign?.donations[2]?.comment  : "..."}
                        </div>
                        <div className='bubble-digit'>
                            ${hasLoaded ? campaign?.donations[2]?.amount : "..."}
                        </div>
                    </div>
                </Grid>
            </Grid>
    );
}

export default HighlightedCampaign;