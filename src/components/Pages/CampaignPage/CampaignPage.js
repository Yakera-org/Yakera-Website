import React, { Component } from 'react';
import Visual from './CampaignPageVisual';
import Author from '../../author';
import PaymentVisual from './PaymentVisual';
import './CampaignPage.css';
import campaigns from '../Donate/allCampaigns';

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

    async AirTM(val, title, name, email){        
        var code = Math.random().toString(36).substring(7);
        const requestBody = {
          "code": code,
          "description": title,
          "cancel_uri": window.location.href,
          "confirmation_uri": "https://www.yakera.net/confirm",
          "amount": val,
          "items": [
            {
              "description": "Yakera donation for: " + title,
              "amount": val,
              "quantity": 1
            }
          ]
        }  
        //sandbox
        //NGRlMWVmYzItYjhlMy00YTA0LTkwYTgtMWUwYmE0MGUyMjkzOjNib0xjQWR4dE1nTW9iOFJuQ0lsUVFiUVZzZ0g2RDcyTVpuWlg5TVNwNVJkMzc5aWU0S3Y3VjZKSXdrWWJId2I=
        //production
        //ZDIyNDNiZmUtNzJlYS00M2EzLThmMGItZmU0NTVlMzU5ZDJhOmdCOHlrUm5iMFlUYmRHUjhuempuWlJEcmFqR3hzakV2d2tEVFR6WlNNNlJnbksxN2xXbnEzck5IWmJPOGtpdUh5YmZ5cTBIMlJuZGtPbmtE
        const config = {
            headers: {
                'Authorization': 'Basic ZDIyNDNiZmUtNzJlYS00M2EzLThmMGItZmU0NTVlMzU5ZDJhOmdCOHlrUm5iMFlUYmRHUjhuempuWlJEcmFqR3hzakV2d2tEVFR6WlNNNlJnbksxN2xXbnEzck5IWmJPOGtpdUh5YmZ5cTBIMlJuZGtPbmtE', 
                'Content-Type': 'application/json',
            }
        }
        const heroku_proxy = "https://shielded-coast-15960.herokuapp.com/";
        const url =  heroku_proxy + "https://payments.air-pay.io/purchases";

        //https://payments.static-stg.tests.airtm.org/purchases
        //https://payments.air-pay.io/purchases

        await axios.post(url, JSON.stringify(requestBody), config)
        .then(res => {
            var id = res.data.id;
            //this.addAmount("AIRTM: " + id, actualValue, name, email).then( () => {
                window.open("https://app.airtm.com/checkout/"+id, "_blank");
                //https://app.stg.airtm.io/checkout/
                //https://app.airtm.com/checkout/
           // })

        })
        .catch(err => {
          //this.onPayPalOff();
          console.log(err)            
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
                    <Visual
                        campaign={campaign} 
                        amount={this.state.amount} 
                        language={this.state.language}
                     />

                     <hr style={{width:'90%', marginLeft:'6%'}}/>

                     {/* Images gallery */}
                    <div className="gallery" id='gallery'>
                        {campaign.images.map((im, i) =>(
                            <img  src={im} alt={i} key={i} />
                        ))}
                    </div>

                    <hr style={{width:'90%', marginLeft:'5%'}}/>

                     <PaymentVisual
                        language={this.state.language}
                        AirTM = {this.AirTM}
                        title={campaign.title[this.state.language]}
                     />
                    
                    <Author />
                </div>      
            )
        }
    }
}

export default CampaignPage;