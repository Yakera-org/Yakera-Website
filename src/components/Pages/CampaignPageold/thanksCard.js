import React, { Component, Fragment } from 'react';
import {Dialog} from '@material-ui/core';


class Thankscard extends Component{
  
    render(){ 
        return(
            <Fragment >
                <Dialog
                    fullWidth={true} 
                    maxWidth='lg'                                 
                    open={this.props.open}
                    onClose={this.props.onClose}
                    className="thanks-dialog"  
                                                                                                                                    
                >
                    
                <h1 style={{marginTop:'100px', fontSize:'50px'}}> Thank you </h1>
                <p style={{marginBottom:'100px', fontSize:'30px'}}> Thank you for your donation of <b>{this.props.amount}$</b> to the campaign: {this.props.title} </p>
                
                  
                </Dialog>
                </Fragment>                   
        )
    }
}

export default Thankscard;