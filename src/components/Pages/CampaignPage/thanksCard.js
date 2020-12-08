import React, { Component, Fragment } from 'react';
import {Dialog, Grid} from '@material-ui/core';
import classnames from 'classnames';

import './sharecard.css';

class Thankscard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
        this.hanldeCopy = this.hanldeCopy.bind(this);
    }

    hanldeCopy(){
        navigator.clipboard.writeText(window.location.href);
        this.setState({
            copied: true
        })
    }
  
    render(){ 
        let copied;
       
        if(this.state.copied){
            copied = <p className="copied">Copied!</p>
        }
        return(
            <Fragment >
                <Dialog
                    fullWidth={true} 
                    maxWidth='lg'                                 
                    open={this.props.open}
                    onClose={this.props.onClose}
                    className="thanks-dialog"  
                                                                                                                                    
                >
                    
                <h1 style={{marginTop:'100px', fontSize:'40px'}}> Thank you </h1>
                <p style={{marginBottom:'100px', fontSize:'20px'}}> Thank you for your donation of <b>{this.props.amount}$</b> to the campaign: {this.props.title} </p>
                
                  
                </Dialog>
                </Fragment>                   
        )
    }
}

export default Thankscard;