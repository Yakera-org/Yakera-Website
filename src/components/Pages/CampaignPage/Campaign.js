import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import  { Card, CardContent, Typography, Grid, Paper, CardHeader, Avatar} from '@material-ui/core';
import image from '../../../pics/landingPic.jpg';
import ShareCard from './ShareCard';
import './campaign.css';
import ExCampaign from './exampleCampaign.json';

class Campaign extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openShare: false
        }
        this.handleScrollToDonate = this.handleScrollToDonate.bind(this);
        this.handleShare = this.handleShare.bind(this);
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
    
    render(){
        let title = this.props.match.params.title;
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
                                percent={100* ExCampaign.reached / ExCampaign.goal}/>
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


                <Card ref="donateSection">
                    <h1 className="donate-card-slit-header">
                        Donate now</h1>

                    <div className="donate-card-slit-target">
                        <p>
                           Please put your bank details below
                        </p> 
                    </div>                   
                </Card>   

                <ShareCard open={this.state.openShare} onClose={this.handleShare}/>
            
            </div>       
        )
    }
}

export default Campaign;