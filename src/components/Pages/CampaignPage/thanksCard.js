import React, { Component, Fragment } from 'react';
import {Dialog} from '@material-ui/core';

import bg_pic_en from '../../../pics/thankyoucard.png';
import bg_pic_sp from '../../../pics/thankyoucard_sp.png';

var bg_pic = bg_pic_en;


class Thankscard extends Component{
  
    render(){ 
        var EN = this.props.EN;
        if(EN==="en"){
            bg_pic = bg_pic_en;
        }else{
            bg_pic = bg_pic_sp;
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
                    <img src={bg_pic} width="100%" alt="background-pic" />
                    
                <h1 style={{marginTop:'10px', color:'#072147'}}> {EN ? 'Thank you!' : 'Gracias!'}</h1>
                <p> {EN ? 'Thank you for your donation of' : 'Gracias por tu donación de'} <b>{this.props.amount}$</b> {EN ? 'To the campaign: ' : 'A la campaña: '} {this.props.title} </p>
                
                  
                </Dialog>
                </Fragment>                   
        )
    }
}

export default Thankscard;