import React, { Component } from 'react';
import CampaignCard from './campaignCard';
import Author from '../../author';
import  { Grid } from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";
import campaigns from './allCampaigns';
import pics from './pics';

import './donate.css';

const _axios = require('axios');
const axios = _axios.create();
const yakeraBackUrl = 'https://api.yakera.net';

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
                tab:'education',
                dicAmount:{}
            }
    }

    async componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        var dicStorage = JSON.parse(localStorage.getItem("dic"));
        if(!dicStorage){
            var dic = {}
            for(let i in campaigns){
                let name = campaigns[i].cam.name;
                await this.getCurrentAmount(name).then((res) => {
                    dic[name] = res
                })
            }
    
            localStorage.setItem("dic", JSON.stringify(dic));
            this.setState({
                dicAmount: dic,
            })
        }else{
            this.setState({
                dicAmount: dicStorage,
            })
        }

        this.setState({
            language: lang,
            loaded:true
        })
    }
    
    handle_change = (value) => {
        this.setState({ value })
    }    

    async getCurrentAmount(name){

        var result = 0;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = yakeraBackUrl + "/api/campaign/?email=" + name;
        
        await axios.get(url, config)
        .then(res => {
                result =  res.data[0].amount
        })
        .catch(err => {
            console.log("error: " + err.message);
        })
    
        return result;   
    }
   
    render(){
        var count = 0;

        if(!this.state.loaded){
            return(
                <div className="donate-page-loading">
                     <div className="sweet-loading loader">
                            <HashLoader
                                size={150}
                                color={"#01224d"}
                                loading={this.state.loading}
                            />
                        </div>                
                    <div id="overlay"></div>

                    <div className="header-top">
                        <h1>
                            Loading
                        </h1>
                    </div>
        
                        <hr id="hr-top"/>
                    </div>
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
    
                <hr id="hr-top"/>

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
                                        amount={this.state.dicAmount[cam.cam.name]}
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
