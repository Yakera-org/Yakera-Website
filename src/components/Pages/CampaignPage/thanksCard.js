import React, { Component, Fragment } from 'react';
import {Dialog} from '@material-ui/core';

import bg_pic from '../../../pics/thankyoucard.png';


class Thankscard extends Component{
  
    render(){ 
        var EN = this.props.EN;

        return(
            <Fragment >
                <Dialog
                    fullWidth={true} 
                    maxWidth='lg'                                 
                    open={this.props.open}
                    onClose={this.props.onClose}
                    className="thanks-dialog"  
                                                                                                                                    
                >
                    <img src={bg_pic} width="100%" alt="background-pic" />
                    
                <h1 style={{marginTop:'100px', fontSize:'50px'}}> {EN ? 'Thank you' : 'Gracias'}</h1>
                <p style={{marginBottom:'100px', fontSize:'30px'}}> {EN ? 'Thank you for your donation of' : 'Gracias por tu donación de'} <b>{this.props.amount}$</b> {EN ? 'To the campaign: ' : 'A la campaña: '} {this.props.title} </p>
                
                  
                </Dialog>
                </Fragment>                   
        )
    }
}

export default Thankscard;