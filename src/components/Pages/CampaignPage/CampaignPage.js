import React, { Component } from 'react';
import Visual from './CampaignPageVisual';
import Author from '../../author';
import PaymentVisual from './PaymentVisual';
import AirTM from './AirTM';
import campaigns from '../Donate/allCampaigns';
import './CampaignPage.css';

class CampaignPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }
        let found = false;
        //loop through all local campaigns and store the one needed
        campaigns.forEach( (cam) => {
            if (cam.cam.title.en === this.props.match.params.title){
                found = true
                this.setState({
                    campaign : cam.cam
                })
            }
        })

        if (!found){
            window.location.replace("/campaigns");
        }

        this.setState({
            loaded: true,
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
                        amount={69} 
                        language={'en'}
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
                        language={'en'}
                        AirTM = {AirTM}
                        title={campaign.title['en']}
                     />
                    
                    <Author />
                </div>      
            )
        }
    }
}


export default CampaignPage;