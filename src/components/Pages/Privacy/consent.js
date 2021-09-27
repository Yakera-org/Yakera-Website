import React, { Component } from 'react';
import LanguageService from '../../../services/language';
import './consent.css';

var terms = "consent.html";

class Terms extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        var lang = LanguageService.getLanguage()
        if(lang === "en"){
            terms= "consent.html"
        }else{
            terms = "consent_sp.html"
        }

        this.setState({
            loaded: true
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
                <div>
                    <iframe src={"../" + terms}
                    title="terms"
                    className="consent-frame"/>     
                </div>      
            )
        }
    }
}

export default Terms;