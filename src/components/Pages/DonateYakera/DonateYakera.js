import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import { validateFields } from '../Register/Validation';
import ExCampaign from './yakeraCampaign.json';
import "react-sweet-progress/lib/style.css";
import  { Card, Grid } from '@material-ui/core';
import image from '../../../pics/donate.png';
import ShareCard from '../CampaignPage/ShareCard';
import ThanksCard from '../CampaignPage/thanksCard';
import ConsentCard from '../CampaignPage/consentCard';
import Paypal from '../CampaignPage/Paypal';
import './donateYakera.css';
import '../CampaignPage/sharecard.css';
import classnames from 'classnames';
import HashLoader from "react-spinners/HashLoader";


const _axios = require('axios');
const axios = _axios.create();
const qs = require('querystring');
const yakeraBackUrl = 'https://api.yakera.net';


class DonateYakera extends Component{
    constructor(props) {
        super(props);
        this.state = {
            campaign: {
                description: "",
                amount: 0,
                state: "",
                category: "",
                deadline: "",
                campaignName: ""
            },
            openShare: false,
            openThanks: false,
            openConsent: false,
            hasAmount: false,
            amount: {
                value: '',
                validateOnChange: false,
                error: '',
              },
            name: {
                value: '',
                validateOnChange: false,
                error: '',
            },
            email: {
                value: '',
                validateOnChange: false,
                error: '',
            },
            consent: false,
            age: false,
            PaypalId: 0,
            opacity: 1,
            margin:0,
            loading: false,
            checkError:''
        }
        this.handleScrollToDonate = this.handleScrollToDonate.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDonateStart = this.handleDonateStart.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.closeThanks = this.closeThanks.bind(this);
        this.onConsent = this.onConsent.bind(this);
        this.onPayPalOn= this.onPayPalOn.bind(this);
        this.onPayPalOff = this.onPayPalOff.bind(this);
        this.onConsentCheck = this.onConsentCheck.bind(this);
        this.onAgeCheck = this.onAgeCheck.bind(this);
    }

    handleScrollToDonate(){
        var element = document.getElementById("donateRef");
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    handleShare(){
        this.setState({
            openShare: !this.state.openShare
        })
    }
    closeThanks(){
        this.setState({
            openThanks: false
        })
        window.location.reload(false);
    }
    onConsent(){
        this.setState({
            openConsent: !this.state.openConsent
        })
    }

    onConsentCheck(){
        this.setState({
            consent: !this.state.consent
        })
    }

    onAgeCheck(){
        this.setState({
            age: !this.state.age
        })
    }

    handleChange(validationFunc, evt) {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        this.setState(state => ({
          [field]: {
            ...state[field],
            value: fieldVal,
            error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
          }
        }));
      }
      handleDonateStart(){

        const { amount, name, email } = this.state;
        const amountError = validateFields.validateNumber(amount.value);
        const nameError = validateFields.validateName(name.value);
        const emailError = validateFields.validateEmail(email.value);
        
        if(this.state.age === false || this.state.consent === false){
            this.setState({
                checkError:'These fields need to be checked'
            })
        }else{
            this.setState({
                checkError:''
            })

            if ([amountError, nameError, emailError].every(e => e === false)) {

                this.setState({
                    hasAmount: true
                })         
            } else {
                // update the state with errors
                this.setState(state => ({
                amount: {
                    ...state.amount,
                    validateOnChange: true,
                    error: amountError
                },
                name: {
                    ...state.name,
                    validateOnChange: true,
                    error: nameError
                },
                email: {
                    ...state.email,
                    validateOnChange: true,
                    error: emailError
                }
                }));
            } 
        }
        }

    async addAmount(){
        const requestBody = {
            "email":"yakera",
            "addAmount": this.state.amount.value,
            "campaignName": "Yakera Donation",
            "donatorEmail": this.state.email.value,
            "donatorName": this.state.name.value,
            "transactionID": this.state.PaypalId
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
          console.log(err.message + ": Amount nod added")            
      })
    
    }

    async onSuccess(details, data) {
        
        this.setState({
            openThanks: true,
            loading: false,
            PaypalId: data.payerID
        })
        await this.addAmount();
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


    async loadCampaign(){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "email": "yakera"
            }
        }
        const url = yakeraBackUrl + "/api/campaign";
        
         await axios.get(url, config)
            .then(res => {
                    this.setState({campaign: res.data[0]});
            })
            .catch(err => {
                console.log("error: " + err.message);
            })
    
    }
    async componentDidMount() { 
        await this.loadCampaign();
        if (typeof window !== "undefined") {
            window.onscroll = () => {
            let currentScrollPos = 800 - window.pageYOffset;

            this.setState({
                    opacity: currentScrollPos / 300,
                    margin: Math.min(Math.max(0, -currentScrollPos + 100), 650)
                    })  
            }
        }
    }

    render(){
        if( this.state.campaign.description === "") {
           return (<p> Loading </p>);
          } else {

            const { amount, name, email } = this.state;
            return(                
                <div className='donate-yakera'>
                    <div className='donate-banner'>
                        <img  className='donate-img-yakera'
                        width="100%"
                        src={image}
                        alt={ExCampaign.title}
                        style={{opacity: this.state.opacity}}
                        />
                    </div>
                    <div className='yakera-campaign-page'>

                        <p className="img-sub">
                            Created by {ExCampaign.author} on 22/12/2020
                        </p>

                        <hr />

                        <Grid container spacing={0} >

                            <Grid item xs={12} sm={6}>

                                {ExCampaign.description.map((p) => 
                                    <p className="campaign-des" key={p}>
                                        {p}
                                    </p> 
                                )}
                            
                            </Grid>

                            <Grid item xs={12} sm={6} style={{marginTop:this.state.margin}}>
                                <Card className="card-right" >
                                    <h1 className="donate-card-slit-header">
                                        Donate now</h1>

                                    <div className="donate-card-slit-target">
                                        <p>
                                            <b style={{ color:'#9c1a1a', marginRight:'5px'}}>
                                                ${this.state.campaign.amount} 
                                            </b>
                                            raised of ${ExCampaign.goal} target   
                                        </p> 
                                    </div>
                                    <div className="progress-bar">
                                        <Progress theme={{
                                            default: {
                                                trailColor: 'lightred',
                                                symbol: '',
                                                color: '#201001',
                                                overflow:'visible'
                                            }
                                        }}
                                        status="default"
                                        percent={parseInt(100* this.state.campaign.amount / ExCampaign.goal)}/>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-block yakera-donate-card-slit-btn"
                                            onClick={this.handleScrollToDonate}                                   
                                            >
                                            Donate now
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-block yakera-donate-card-slit-btn"
                                            onClick={this.handleShare}
                                            >
                                            Share
                                        </button>
                                    </div>   
                                </Card>
                            </Grid>
                        </Grid>

                        <div className="sweet-loading">
                            <HashLoader
                                css="display: block;
                                margin: 0 auto;
                                border-color: blue;
                                position: fixed;
                                top:40%;
                                left:45%"
                                size={150}
                                color={"#9c1a1a"}
                                loading={this.state.loading}
                            />
                        </div>
                        <hr id="sep-cards"/>


                        <Card id="donateRef" className="donateSection">
                            <h1 className="donate-card-slit-header">
                                Donate now
                            </h1>

                            <div className="donate-section">

                            {!this.state.hasAmount
                                ? <div className="donate-card-slit-target">
                                <p>Please enter details below</p>
                                <input
                                type="number"
                                name="amount"
                                value={amount.value}
                                style={{ marginTop:'10px', height:'50px'}}
                                placeholder="$"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': amount.error === false },
                                    { 'is-invalid': amount.error }
                                    )}
                                    onChange={evt =>
                                        this.handleChange(validateFields.validateNumber, evt)
                                    } />
                                <div style={{marginBottom:'10px'}} className="invalid-feedback">{amount.error}</div> 
                                <input
                                type="text"
                                name="email"
                                value={email.value}
                                style={{ marginTop:'10px'}}
                                placeholder="Email"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': email.error === false },
                                    { 'is-invalid': email.error }
                                    )}
                                    onChange={evt =>
                                        this.handleChange(validateFields.validateEmail, evt)
                                    }
                                    
                                    
                                    />
                                <div style={{marginBottom:'10px'}} className="invalid-feedback">{email.error}</div> 
                                
                                <input
                                type="text"
                                name="name"
                                value={name.value}
                                style={{ marginTop:'10px'}}
                                placeholder="Name"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': name.error === false },
                                    { 'is-invalid': name.error }
                                    )}
                                    onChange={evt =>
                                        this.handleChange(validateFields.validateName, evt)
                                    }                                   
                                    
                                    />
                                <div style={{marginBottom:'10px'}} className="invalid-feedback">{name.error}</div> 
                                
                                <input
                                    name="consent"
                                    type="checkbox"
                                    onChange={this.onConsentCheck}
                                    style={{ marginTop:'10px', width:'15px', float:'left'}}
                                    className={classnames(
                                        'form-control'
                                        )}
                                />
                                <div className="consent-txt" >
                                    I consent to the 
                                    <button
                                        className="consent-btn"  
                                        onClick={this.onConsent}
                                        >
                                        privacy form
                                    </button>  
                                </div>

                                <input
                                    name="age"
                                    type="checkbox"
                                    onChange={this.onAgeCheck}
                                    style={{ marginBottom:'5px', marginTop:'5px', width:'15px', float:'left', clear:'both'}}
                                    className={classnames(
                                        'form-control'
                                        )}
                                />
                                <div className="age-txt" >
                                    I confirm to be 18 or over
                                </div>

                                <div style={{clear:'both', color:'#d62828', fontWeight:'bold'}}>{this.state.checkError}</div>

                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-block yakera-donate-start-btn"    
                                    onClick={this.handleDonateStart}                   
                                    >
                                    Donate
                                </button>               
                            </div> 
                                : <div className="donate-card-slit-target">
                                <p>
                                    You are about to donate <b>{this.state.amount.value} $ </b>
                                </p>
                                <p>                   
                                    Please put your bank details below
                                </p>  
                                    <Paypal amount={this.state.amount.value} onSuccess={this.onSuccess} onClick={this.onPayPalOn} onError={this.onPayPalOff} onCancel={this.onPayPalOff}/>  
                                </div>  
                            }
                            </div>

                            

                            

                        </Card>   

                        <ShareCard open={this.state.openShare} onClose={this.handleShare}/>
                        <ConsentCard open={this.state.openConsent} onClose={this.onConsent}/>
                        <ThanksCard open={this.state.openThanks} onClose={this.closeThanks} amount={this.state.amount.value} title={ExCampaign.title}/>
                    
                    </div>       
            </div>
            )
        }
    }
}

export default DonateYakera;