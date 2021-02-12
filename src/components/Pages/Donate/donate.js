import React, { Component } from 'react';
import CampaignCard from '../../campaignCard';
import Author from '../../author';
import  { Grid } from '@material-ui/core';

import campaigns from './allCampaigns';
import './donate.css';


class donate extends Component{
    constructor(props) {
        super(props);
        this.state = {
             value: 0
             }
    }
    
    handle_change = (value) => {
        this.setState({ value })
    }
   
    render(){
        return(
            <div className="donate-page">
             <Grid container spacing={5} style={{alignContent:'center', alignItems:'center'}}>
                {campaigns.map((cam) => (
                    <Grid item xs={12} sm={3} key={cam.cam.name}>
                        <CampaignCard
                            campaign={cam.cam}
                        />
                    </Grid>
                ))}             

            </Grid>
            <div style={{marginTop:'16%'}}>
                <Author />
            </div>

            </div>
        )
    }
}

export default donate;
