import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import { validateFields } from '../Register/Validation';
import ExCampaign from './exampleCampaign.json';
import "react-sweet-progress/lib/style.css";
import  { Card, Grid} from '@material-ui/core';
import vladimirBike from '../../../pics/vladBike.jpeg';
import vladimirFam from '../../../pics/vladFam.png';
import vladimir1 from '../../../pics/vlad1.jpg';
import vladimir2 from '../../../pics/vlad2.jpg';
import vladimir3 from '../../../pics/vlad3.jpg';
import vladimir4 from '../../../pics/vlad4.jpg';
import ShareCard from './ShareCard';
import ThanksCard from './thanksCard';
import Paypal from './Paypal';
import './campaign.css';
import './sharecard.css';
import classnames from 'classnames';
import HashLoader from "react-spinners/HashLoader";

const _axios = require('axios');
const axios = _axios.create();
const qs = require('querystring');
const yakeraBackUrl = 'http://yakera-back-dev.eu-west-3.elasticbeanstalk.com';

class Campaign extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openShare: false,
            openThanks: false,
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
            campaign: {
                description: "",
                amount: 0,
                state: "",
                category: "",
                deadline: "",
                campaignName: ""
            },
            PaypalId: 0,
            margin: -4000,
            loading:false
        }
        this.handleScrollToDonate = this.handleScrollToDonate.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDonateStart = this.handleDonateStart.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.closeThanks = this.closeThanks.bind(this);
        this.onPayPalOn= this.onPayPalOn.bind(this);
        this.onPayPalOff = this.onPayPalOff.bind(this);
    }

    async componentDidMount() { 
        await this.loadCampaign();
        if (typeof window !== "undefined") {
            window.onscroll = () => {
                
            let height = window.document.body.offsetHeight;
            let currentScrollPos = 2*window.pageYOffset - height ;
            let margin = Math.min(Math.max(-height+0.2*height, currentScrollPos+0.2*height), height/2)
            if(height > 6000){
                margin= 700
            }

            this.setState({
                    margin: margin
                    })  
            }
        }
    }
    async loadCampaign(){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "email": "vladimir"
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
    async addAmount(){
        const requestBody = {
            "email":"vladimir",
            "addAmount": this.state.amount.value,
            "campaignName": "Mototaxista Vladimir",
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
              console.log(res.data);
              console.log("SUCCESS");
        })
        .catch(err => {
          console.log(err.message + ": Amount nod added")            
      })
    
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
    render(){

        if( this.state.campaign.description == "") {
            return (<p> Loading </p>);
           } else {
                let title = this.props.match.params.title;
                const { amount, email, name } = this.state;
                return(
                    <div className='campaign-page'>
                        <div>
                            <HashLoader
                            css="display: block;
                                margin: 0 auto;
                                border-color: blue;
                                position: fixed;
                                top:40%;
                                left:45%"
                            size={150}
                            color={"#003049"}
                            loading={this.state.loading}
                            />
                        </div>
                        <h1 className="campaign-title">{title}</h1>
                        <hr id="top-hr"/>
                        <div className='backdrop-img'>
                            <img  
                                style={{
                                    maxHeight:'500px',
                                    maxWidth:'100%',
                                    borderRadius:'6px',
                                    display:'block',
                                    width:'50',
                                    height:'auto',
                                    marginLeft:'auto',
                                    marginRight:'auto'
                                }}
                                    src={vladimirBike}
                                    alt={title}
                                    />
                                    
                        </div>
                        

                        <p className="img-sub">
                            Created by Yakera on 12/12/2020
                        </p>

                        <hr id="top-hr"/>

                        <Grid container spacing={10} style={{alignContent:'center', alignItems:'center'}}>

                            <Grid item xs={12} sm={6}>
                            <div>
                                {ExCampaign.description.EN.map((p, index) => 
                                <div key={index+"d"}>
                                    <h1 style={{visibility:'hidden'}}>h </h1>
                                    <h2> {ExCampaign.headers.EN[index]}</h2> 
                                    <p className="campaign-des" key={index}>
                                        {p}
                                    </p> 
                                </div>
                                    )}
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={6} style={{marginTop:this.state.margin}}>
                                <Card className='card-right'>
                                    <h1 className="donate-card-slit-header">
                                        Donate now</h1>

                                    <div className="donate-card-slit-target">
                                        <p>
                                            <b style={{fontSize:'35px', color:'#003049', marginRight:'5px'}}>
                                                ${this.state.campaign.amount} 
                                            </b>
                                            raised of $200 target   
                                        </p> 
                                    </div>
                                    <div className="progress-bar">
                                        <Progress theme={{
                                            default: {
                                                trailColor: 'lightblue',
                                                symbol: '',
                                                color: '#003049',
                                                overflow:'visible'
                                            }
                                        }}
                                        status="default"
                                        percent={parseInt(100* this.state.campaign.amount / 200)}/>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-block donate-card-slit-btn"
                                            onClick={this.handleScrollToDonate}                                   
                                            >
                                            Donate now
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-block donate-card-slit-btn"
                                            onClick={this.handleShare}
                                            >
                                            Share
                                        </button>
                                    </div>   
                                </Card>
                            </Grid>
                        </Grid>                                                 
                        
                        <hr style={{margin:'50px 0px'}}/>

                        <Grid container spacing={2} style={{alignContent:'center', alignItems:'center'}}>
                            <Grid item xs={12} sm={3}>
                                <img  
                                    className='bottom-img'
                                    src={vladimir1}
                                    alt={title}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <img  
                                    className='bottom-img'
                                    src={vladimir2}
                                    alt={title}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <img  
                                    className='bottom-img'
                                    src={vladimir3}
                                    alt={title}
                                    />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <img  
                                    className='bottom-img'
                                    src={vladimir4}
                                    alt={title}
                                    />
                            </Grid>
                        </Grid>   

                        <hr style={{margin:'50px 0px'}}/>
                        
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
                                        style={{marginTop:'10px', height:'50px'}}
                                        placeholder="$"
                                        className={classnames(
                                            'form-control',
                                            { 'is-valid': amount.error === false },
                                            { 'is-invalid': amount.error },
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


                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-block donate-start-btn"    
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
                        <ThanksCard open={this.state.openThanks} onClose={this.closeThanks} amount={this.state.amount.value} title={ExCampaign.title}/>

                    
                    </div>       
                )
            }
        }
}

export default Campaign;