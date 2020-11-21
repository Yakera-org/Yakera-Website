import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Progress } from 'react-sweet-progress';
import { validateFields } from '../Register/Validation';
import ExCampaign from './exampleCampaign.json';
import "react-sweet-progress/lib/style.css";
import  { Card, CardContent, Typography, Grid, Paper, CardHeader, Avatar} from '@material-ui/core';
import image from '../../../pics/landingPic.jpg';
import ShareCard from './ShareCard';
import ThanksCard from './thanksCard';
import Paypal from './Paypal';
import './campaign.css';
import './sharecard.css';
import classnames from 'classnames';

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
                error: ''
              }
        }
        this.handleScrollToDonate = this.handleScrollToDonate.bind(this);
        this.handleShare = this.handleShare.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDonateStart = this.handleDonateStart.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.closeThanks = this.closeThanks.bind(this);
    }

    handleScrollToDonate(){
        const donateSection = ReactDOM.findDOMNode(this.refs.donateSection);       
        window.scrollTo({ behavior: 'smooth', top: donateSection.offsetTop })
        
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

        const { amount } = this.state;
        const amountError = validateFields.validateNumber(amount.value);
        

        if ([amountError].every(e => e === false)) {
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
              }
            }));
          } 
      }

      onSuccess(details, data) {
          console.log(details);
          console.log(data);

          this.setState({
              openThanks: true
          })
      }
    render(){
        let title = this.props.match.params.title;
        const { amount } = this.state;
        return(
            <div className='campaign-page'>
                <h1 className="campaign-title">{title}</h1>
                <hr />
                <div style={{textAlign:'center', overflow: 'hidden'}}>
                <img  
                    style={{
                        minHeight:'100%',
                        minWidht:'100%',
                        borderRadius:'6px'
                    }}
                        width="100%"
                        src={image}
                        alt={title}
                        />
                </div>

                <p className="img-sub">
                    Created by {ExCampaign.author} on {ExCampaign.created}
                </p>

                <hr />

                <Grid container spacing={5} style={{alignContent:'center', alignItems:'center'}}>

                    <Grid item xs={12} sm={6}>
                    <p className="campaign-des">
                        {ExCampaign.description}
                    </p>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Card>
                            <h1 className="donate-card-slit-header">
                                Donate now</h1>

                            <div className="donate-card-slit-target">
                                <p>
                                    <b style={{fontSize:'35px', color:'#003049', marginRight:'5px'}}>
                                        ${ExCampaign.reached} 
                                    </b>
                                      raised of ${ExCampaign.goal} target   
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
                                percent={parseInt(100* ExCampaign.reached / ExCampaign.goal)}/>
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


                <Card ref="donateSection" >
                    <h1 className="donate-card-slit-header">
                        Donate now
                    </h1>

                    <div className="donate-section">

                    {!this.state.hasAmount
                        ? <div className="donate-card-slit-target">
                        <p>Please enter amount below</p>
                        <input
                        type="number"
                        name="amount"
                        value={amount.value}
                        placeholder="$"
                        className={classnames(
                            'form-control',
                            { 'is-valid': amount.error === false },
                            { 'is-invalid': amount.error }
                            )}
                            onChange={evt =>
                                this.handleChange(validateFields.validateNumber, evt)
                            }
                            style={{width:'20%', marginLeft:'40%'}}
                            
                            />
                        <div style={{marginBottom:'10px'}} className="invalid-feedback">{amount.error}</div>   

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
                            <Paypal amount={this.state.amount.value} onSuccess={this.onSuccess}/>  
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

export default Campaign;