import React, { Component } from 'react';

import './CampaignPage.css';

class CampaignPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            language: 'en'
        }
    }

    componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        this.setState({
            loaded: true,
            language: lang
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
            return(
                <div className="campaignPage">
                    {this.props.match.params.title}
                </div>      
            )
        }
    }
}

export default CampaignPage;