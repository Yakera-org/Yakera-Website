import React, { Component } from 'react';
import Visual from './CampaignPageVisual';
import Author from '../../author';
import PaymentVisual from './PaymentVisual';
import './CampaignPage.css';
import api from '../../../services/api';
import LanguageService from '../../../services/language';

class CampaignPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    async componentDidMount(){
        localStorage.setItem('currentTab', "campaigns");
        var language = LanguageService.getLanguage()
        let found = false;
        try {
            const res = await api.get(`/campaigns/${this.props.match.params.title}`);
            if (res.data.data) {
                found = true;
                this.setState({
                    campaign: res.data.data,
                });
            } 
        } catch (err) {
            console.log('err');
        } finally {
            if (!found) {
                window.location.replace("/campaigns");
            }
            this.setState({
                loaded:true,
                language: language
            });
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
                        title={campaign.title}
                        slug={campaign.slug}
                     />
                    
                    <Author />
                </div>      
            )
        }
    }
}


export default CampaignPage;
