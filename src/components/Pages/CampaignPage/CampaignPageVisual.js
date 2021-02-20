import React, { Component } from 'react';
import  {Grid} from '@material-ui/core';

import DonateCard from './DonateCard';

var marginOffset = 50;

class CampaignPageVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marginCard:marginOffset,
            showShare:false
        }
        this.onShare = this.onShare.bind(this);
    }

    onShare(){
        this.setState({
            showShare: !this.state.showShare
        })
    }

    componentDidMount(){
        if (typeof window !== "undefined") {
            window.onscroll = () => {
                let offset = marginOffset;
                let currentScrollPos = window.pageYOffset  ;
                this.setState({
                        marginCard: currentScrollPos + offset
                        })  
                }
        }
    }

    render() {
        const campaign = this.props.campaign;
        const amount = this.props.amount;
        const target = this.props.target;
        const language = this.props.language;
        return (
            <div className = "camp-page-vis">
                <h1>{campaign.title.en}</h1>  
                <Grid container spacing={5} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={8}>
                        {/* left column  */}
                        <hr />              

                        <div className="campaign-page-title-img">
                            <img src={campaign.image} alt="title.img"/>
                        </div>

                        <p id="author-credit">Created by {campaign.author} on {campaign.date}</p>

                        <hr style={{marginBottom:'-10px'}}/>    

                        <div className="camp-page-story">
                            {campaign.headers[language].map((h, i) =>(
                                <div key={h+i}>
                                    <h2 key={i}>{h}</h2>
                                    <p key={h}>{campaign.story[language][i]}</p>
                                </div>
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                         {/* right column  */}
                         <div style={{marginTop:this.state.marginCard+'px', width:'100%'}}>
                         <DonateCard
                            amount={amount}
                            target={target}
                            showShare={this.state.showShare}
                            onShare={this.onShare}
                            onClose={this.onShare}
                            />
                         </div>
                             
                        
                    </Grid>
                    
                </Grid>

            </div>
        );
    }
}

export default CampaignPageVisual;