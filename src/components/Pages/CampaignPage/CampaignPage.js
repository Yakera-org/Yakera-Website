import React, { Component } from 'react';
import Visual from './CampaignPageVisual';
import './CampaignPage.css';
import campaigns from '../Donate/allCampaigns';

const _axios = require('axios');
const axios = _axios.create();
const yakeraBackUrl = 'https://api.yakera.net';

class CampaignPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            language: 'en',
            campaign: null,
            amount:0,
            target:0
        }
    }

    async componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        var camName; 
        
        //loop through all local campaigns and store the one needed
        campaigns.forEach( (cam) => {
            if (cam.cam.title.en === this.props.match.params.title){
                this.setState({
                    campaign : cam.cam
                })
                camName = cam.cam.name;
            }
        })
        await this.loadCampaign(camName);

        this.setState({
            loaded: true,
            language: lang
        })
    }

    async loadCampaign( name ){
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = yakeraBackUrl + "/api/campaign/?email=" + name;
        
         await axios.get(url, config)
            .then(res => {
                this.setState({
                    amount: res.data[0].amount
                })
            })
            .catch(err => {
                console.log("error: " + err.message);
            })
    
    }
    
    render(){
        if(!this.state.loaded){
            return(
                <div>
                    Loading
                </div>
            )
        }else{
            const campaign = this.state.campaign
            return(
                <div className="campaignPage">
                    <Visual
                        campaign={campaign} 
                        amount={this.state.amount} 
                        target={200}
                        language={this.state.language}
                     />
                </div>      
            )
        }
    }
}

export default CampaignPage;