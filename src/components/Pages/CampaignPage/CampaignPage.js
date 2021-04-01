import React, { Component } from 'react';
import Visual from './CampaignPageVisual';
import Author from '../../author';
import PaymentVisual from './PaymentVisual';
import './CampaignPage.css';
import campaigns from '../Donate/allCampaigns';
import HashLoader from "react-spinners/HashLoader";

const _axios = require('axios');
const axios = _axios.create();
const qs = require('querystring');
const yakeraBackUrl = 'https://api.yakera.net';

class CampaignPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            loading: false,
            language: 'en',
            campaign: null,
            amount:0,
            target:0
        }
        this.onPayPalOff = this.onPayPalOff.bind(this);
        this.onPayPalOn = this.onPayPalOn.bind(this);
        this.addAmount = this.addAmount.bind(this);
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
    async addAmount(payerID, amount, name, email){
        const requestBody = {
            "email":this.state.campaign.name,
            "addAmount": amount,
            "campaignName": this.state.campaign.campaignName,
            "donatorEmail": email,
            "donatorName": name,
            "transactionID": payerID
        }
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const url = yakeraBackUrl + "/api/campaign/addAmount";
        
        await axios.post(url, qs.stringify(requestBody), config)
        .then(res => {
              console.log("SUCCESS");
        })
        .catch(err => {
          console.log(err.message + ": Amount not added")            
      })    
    }

    async AirTM(){
        const requestBody = {
          "code": "drgdfgdfg",
          "description": "Test purchase ",
          "cancel_uri": "http://localhost/confirmed",
          "confirmation_uri": "http://localhost/confirmed",
          "amount": 10,
          "items": [
            {
              "description": "Purchase Item 1",
              "amount": 10,
              "quantity": 1
            }
          ]
        }  
        const config = {
            headers: {
                'Authorization': 'Basic NGRlMWVmYzItYjhlMy00YTA0LTkwYTgtMWUwYmE0MGUyMjkzOjNib0xjQWR4dE1nTW9iOFJuQ0lsUVFiUVZzZ0g2RDcyTVpuWlg5TVNwNVJkMzc5aWU0S3Y3VjZKSXdrWWJId2I=', 
                'Content-Type': 'application/json'
            }
        }

        const url =  "https://payments.static-stg.tests.airtm.org/purchases";

        await axios.post(url, JSON.stringify(requestBody), config)
        .then(res => {
              console.log("SUCCESS");
              console.log(res);
        })
        .catch(err => {
          console.log(err.message + ": airtmID not generated")            
        })  
    }

    onPayPalOff(){
        this.setState({
            loading: false
        })
    }
    onPayPalOn(){
        this.setState({
            loading: true
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

                
                //NOTE: ACTIVATE ANALYTICS BEFORE PUSHING


                <div className="campaignPage">
                    <div className="sweet-loading">
                            <HashLoader
                                css="display: block;
                                margin: 0 auto;
                                border-color: blue;
                                position: fixed;
                                top:40%;
                                left:45%"
                                size={150}
                                color={"#01224d"}
                                loading={this.state.loading}
                            />
                        </div>
                    <Visual
                        campaign={campaign} 
                        amount={this.state.amount} 
                        language={this.state.language}
                     />

                     <hr style={{width:'90%', marginLeft:'6%'}}/>

                     {/* Images gallery */}
                    <div className="gallery">
                        {campaign.images.map((im, i) =>(
                            <img  src={im} alt={i} key={i} />
                        ))}
                    </div>

                    <hr style={{width:'90%', marginLeft:'6%'}}/>

                     <PaymentVisual
                        language={this.state.language}
                        AirTM = {this.AirTM}
                        onPayPalOff={this.onPayPalOff}
                        onPayPalOn={this.onPayPalOn}
                        addAmount={this.addAmount}
                        title={campaign.title[this.state.language]}
                     />
                    
                    <Author />
                </div>      
            )
        }
    }
}

export default CampaignPage;