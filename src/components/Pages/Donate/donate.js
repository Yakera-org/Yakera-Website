import React, { Component } from 'react';
import CampaignCard from '../../campaignCard';
import  { Grid } from '@material-ui/core';
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

                <Grid item xs={12} sm={4}>
                    <CampaignCard
                    author="J"
                    title="Books for local school"
                    description="children need education"
                    deadline="1 December 2020"
                    image="https://venezuelanalysis.com/files/styles/large/public/images/2011/08/escuelas_bolivarianas.jpg?itok=rpJh-B6v"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CampaignCard
                    author="A"
                    title="Medecin for José"
                    description="help me pls"
                    deadline="12 December 2020"
                    image="https://staticshare.america.gov/uploads/2020/04/GettyImages-1206996921.jpg"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CampaignCard 
                    author="H"
                    title="Oil needed to repair bike"
                    description="I cant afford oil"
                    deadline="12 Nov 2020"
                    image="https://s4.reutersmedia.net/resources/r/?m=02&d=20200602&t=2&i=1520799557&w=780&fh=&fw=&ll=&pl=&sq=&r=LYNXMPEG511GW"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CampaignCard 
                    author="L"
                    title="Oil needed to repair bike"
                    description="I cant afford oil"
                    deadline="12 Nov 2020"
                    image="https://s4.reutersmedia.net/resources/r/?m=02&d=20200602&t=2&i=1520799557&w=780&fh=&fw=&ll=&pl=&sq=&r=LYNXMPEG511GW"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CampaignCard 
                    author="J"
                    title="Oil needed to repair bike"
                    description="I cant afford oil"
                    deadline="12 Nov 2020"
                    image="https://s4.reutersmedia.net/resources/r/?m=02&d=20200602&t=2&i=1520799557&w=780&fh=&fw=&ll=&pl=&sq=&r=LYNXMPEG511GW"
                    />
                </Grid>

            </Grid>

            </div>
        )
    }
}

export default donate;