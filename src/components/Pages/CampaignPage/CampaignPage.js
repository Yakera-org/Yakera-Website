import React, { Component } from 'react';
import Visual from './CampaignPageVisual';
import Author from '../../author';
import PaymentVisual from './PaymentVisual';
import './CampaignPage.css';
import { unauthenticatedGet } from '../../../utils';
import LanguageService from '../../../services/language';

const yakeraBackendUrl = 'https://api.yakera.org/campaigns/';

class CampaignPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    async componentDidMount(){
        var language = LanguageService.getLanguage()
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
                if (!found){
                    window.location.replace("/campaigns");
                }
                this.setState({
                    loaded:true,
                    language: language
                });
            });

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
                <div className="campaignPage">
                    <Visual
                        campaign={campaign} 
                        amount={campaign.raised} 
                        language={this.state.language}
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
                        title={campaign.title['en']}
                        slug={campaign.slug}
                     />
                    
                    <Author />
                </div>      
            )
        }
    }
}


export default CampaignPage;
