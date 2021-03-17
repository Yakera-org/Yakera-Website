import React, { Component } from 'react';
import CampaignCard from './campaignCard';
import Author from '../../author';
import  { Grid } from '@material-ui/core';

import campaigns from './allCampaigns';
import pics from './pics';
import './donate.css';

const colorDic={
    "education": '#71b98f',
    "healthcare": '#ff7d7d',
    "business":'#7099d0',
    "nutrition": '#ffc19a',
  }


class donate extends Component{
    constructor(props) {
        super(props);
        this.state = {
                value: 0,
                loaded: false,
                language: 'en',
                tab:'education'
            }
    }

    componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        this.setState({
            language: lang,
            loaded:true
        })
    }
    
    handle_change = (value) => {
        this.setState({ value })
    }    
   
    render(){
        var count = 0;

        if(!this.state.loaded){
            return(
                <p>Loading</p>
            )
        }else{

            return(
                <div className="donate-page">
                <div className="header-top">
                    <h1>
                        {this.state.language === 'en' ? 'Campaigns' : 'Campañas'}
                    </h1>
                    <p>
                        {this.state.language === 'en' ? 'Browse campaigns and chip in. Now, more than ever, Venezuelans need your help in education, healthcare, nutrition, and small business. Yakera helps Venezuelans transition from survival to resilience.' : 'Explora campañas y dona directamente. Ahora más que nunca, los venezolanos necesitan tu ayuda en educación, salud, nutrición y pequeños negocios. Yakera asiste a los venezolanos a pasar de supervivencia a resiliencia.'}
                    </p>
                </div>
    
                <hr style={{margin:'50px 0'}}/>

                 <Grid container spacing={5} style={{alignContent:'center', alignItems:'flex-start'}}>
                    {campaigns.sort(() => 0.5 - Math.random()).map((cam, i) => {
                            count++;
                            return(
                                <Grid item xs={12} sm={3} key={i}>
                                    <CampaignCard
                                        campaign={cam.cam}
                                        color={colorDic[cam.cam.category]}
                                        language={this.state.language}
                                        logo={pics[cam.cam.category]}
                                    />
                                </Grid>
                            )                       
                    })}    

                </Grid>
    
                <div style={{textAlign:'center'}}>
                    <p id='no-cam'>
                        {count===0 ?  this.state.language === 'en' ? 'No campaigns in this category' : 'No hay campañas en esta categoría.' : ''}
                    </p>
                </div>

                <div style={{marginTop:'16%'}}>
                    <Author />
                </div>
    
                </div>
            )
        }
    }
}

export default donate;
