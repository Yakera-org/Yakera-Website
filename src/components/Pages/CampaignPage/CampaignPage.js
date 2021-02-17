import React, { Component } from 'react';
import Visual from './CampaignPageVisual';
import './CampaignPage.css';
import campaigns from '../Donate/allCampaigns';

class CampaignPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            language: 'en',
            campaign: null
        }
    }

    componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        //loop through all local campaigns and store the one needed
        campaigns.forEach( (cam) => {
            if (cam.cam.title.en == this.props.match.params.title){
                this.setState({
                    campaign : cam.cam
                })
            }
        })


        this.setState({
            loaded: true,
            language: lang
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
                    <Visual campaign={campaign}/>
                </div>      
            )
        }
    }
}

export default CampaignPage;