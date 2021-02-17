import React, { Component } from 'react';
import  {Grid} from '@material-ui/core';

import DonateCard from './DonateCard';

class CampaignPageVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marginCard:0
        }
    }

    componentDidMount(){

        if (typeof window !== "undefined") {
            window.onscroll = () => {
                let currentScrollPos = window.pageYOffset  ;
                this.setState({
                        marginCard: currentScrollPos
                        })  
                }
        }
    }

    render() {
        const campaign = this.props.campaign
        return (
            <div className = "camp-page-vis">
                <h1>{campaign.title.en}</h1>  
                <Grid container spacing={10} style={{alignContent:'flex-start', alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={8}>
                        {/* left column  */}
                        <hr />              
                        <img src={campaign.image} />
                        <div className="camp-page-story">
                            {campaign.story['en'].map((p, i) => (
                                <p key={i}>{p}</p>
                                ))}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                         {/* right column  */}
                         <div style={{marginTop:this.state.marginCard+'px'}}>
                         <DonateCard />
                         </div>
                             
                        
                    </Grid>
                    
                </Grid>

            </div>
        );
    }
}

export default CampaignPageVisual;