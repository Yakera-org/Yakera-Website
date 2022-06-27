import React from 'react';
import { Grid } from '@material-ui/core';
import DashboardCampaign from './DashboardCampaign';

function DashboardContent(props) {
    const data = props.data
    const EN = props.EN
    const campaigns = data.campaigns
    
    
    function goToCampaign(e){
        e.preventDefault();
        window.location.href = "../campaign/" + e.target.name
    }

    function closeCampaign(e){
        window.alert("close campaign: " + e.target.name)
    }
    
    function withdrawFunds(e){
        window.alert("Withdraw from : " + e.target.name)
    }

    return (
        <div className='dashboard-campaigns-area'>
            <h3>{EN ? "Your " : "Tus "}<span id='orange'>{EN ? "Campaigns" : "Campañas"}</span></h3>
            <Grid container spacing={1} className='dashboard-campaigns-grid'>
                {campaigns.map((campaign, i) => {
                    return(
                        <Grid item xs={12} sm={6} key={i}>
                            <DashboardCampaign 
                                EN={EN} 
                                campaign={campaign} 
                                goToCampaign={goToCampaign}
                                closeCampaign={closeCampaign}
                                withdrawFunds={withdrawFunds}
                            />
                        </Grid>
                    ) 
                })}
                <Grid item xs={12} sm={6} className='plus-sign'>
                    <a href='../create-campaign'><i className="fas fa-7x fa-plus-circle"></i></a>
                </Grid>
            </Grid>
        </div>
    );
}

export default DashboardContent;