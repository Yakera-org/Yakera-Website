import React, { Component } from 'react';
import CampaignCard from '../../campaignCard';
import Author from '../../author';
import  { Grid } from '@material-ui/core';
import './donate.css';

import valdimir from '../../../pics/vladBike.jpeg';

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
                
                <Grid item xs={12} sm={3}>
                    <CampaignCard
                        author="V"
                        title="Help Vladimir Work As a Mototaxista"
                        description="Help Vladimir get back on his feet after his motorcycle was stolen"
                        deadline="12 December 2020"
                        image={valdimir}
                    />
                </Grid>
                

            </Grid>
            <div style={{marginTop:'16%'}}>
                <Author />
            </div>

            </div>
        )
    }
}

export default donate;
