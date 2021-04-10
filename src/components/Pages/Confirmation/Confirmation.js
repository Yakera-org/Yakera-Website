import React, { Component, Fragment } from 'react';
import {Dialog} from '@material-ui/core';
import bg_pic_en from '../../../pics/thankyoucard.png';
import bg_pic_sp from '../../../pics/thankyoucard_sp.png';

import './confirmation.css';

var bg_pic = bg_pic_en;

class Confirmation extends Component {

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
    }

    onClose(){
        window.location.href = "https://www.yakera.net/campaigns";
    }
    
    render() {
        var lang = localStorage.getItem("lang");
        var EN = true;
        if(!lang){
            localStorage.setItem("lang", "en");
        }
        if(lang === "sp"){
            bg_pic = bg_pic_sp;
            EN = false;
        }
        return (
            <div>
                 <Fragment >
                    <Dialog
                        fullWidth={true} 
                        maxWidth='md'                                 
                        open={true}
                        onClose={this.onClose}
                        className="-dialog"  
                        style={{backgroundColor:'grey'}}                                                                                     
                    >
                        <div style={{backgroundColor:'#072147'}} >
                            
                            <img src={bg_pic} width="100%" alt="background-pic" />
                            
                            <button
                                type="submit"
                                className="btn btn-secondary btn-block conf-but"    
                                onClick={this.onClose}                   
                                >
                                {EN ? 'Return to site' : 'Regresa al sitio'}
                            </button>
                        </div>

                    </Dialog>
                    </Fragment>  
            </div>
        );
    }
}

export default Confirmation;