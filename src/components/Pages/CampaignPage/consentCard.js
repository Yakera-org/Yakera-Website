import React, { Component, Fragment } from 'react';
import { Dialog } from '@material-ui/core';
import LanguageService from '../../../services/language';

var consent = "consent.html";

class Thankscard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        var lang = LanguageService.getLanguage()
        if(!lang){
            LanguageService.setLanguage()
        }
        if(lang === "en"){
            consent= "consent.html"
        }else{
            consent = "consent_sp.html"
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
                <Fragment >
                    <Dialog
                        fullWidth={true}
                        maxWidth='lg'
                        open={this.props.open}
                        onClose={this.props.onClose}

                    >

                    <iframe src={"../" + consent} title="consentform"
                    style={{
                        padding: '10px 10px',
                        height:'700px'
                    }} />
                    <br />

                    <button
                        type="submit"
                        className="btn btn-secondary btn-block consent-return"
                        onClick={this.props.onClose}
                        >
                        return
                    </button>

                    </Dialog>
                    </Fragment>
            )
        }
    }
}

export default Thankscard;
