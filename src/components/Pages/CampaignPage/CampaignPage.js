import React, { Component } from 'react';
import Visual from './CampaignPageVisual';
import Author from '../../author';
import PaymentVisual from './PaymentVisual';
import AirTM from './AirTM';
import './CampaignPage.css';
import { unauthenticatedGet } from '../../../utils';

const yakeraBackendUrl = 'https://express-backend-api.herokuapp.com/api/campaigns/';

class CampaignPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    async componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }
        let found = false;
        await unauthenticatedGet(yakeraBackendUrl, {})
            .then(data => {
                console.log(data)
                data.data.campaigns.forEach((cam) => {
                    if (cam.slug === this.props.match.params.title) {
                        found = true;
                        this.setState({
                            campaign: cam,
                        });
                    }
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState({
                    loaded:true
                });
            });

        if (!found){
            window.location.replace("/campaigns");
        }
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
                        amount={campaign.raised} 
                        language={'en'}
                     />

                     <hr style={{width:'90%', marginLeft:'6%'}}/>

                     {/* Images gallery */}
                    <div className="gallery" id='gallery'>
                        {campaign.pictures.map((im, i) =>(
                            <img  src={im.url} alt={i} key={i} />
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