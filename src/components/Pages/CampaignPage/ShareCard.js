import React, { Component, Fragment } from 'react';
import {Dialog, DialogTitle} from '@material-ui/core';

import './sharecard.css';

class ShareCard extends Component{
  
    render(){ 
        return(
            <Fragment >
                <Dialog
                    fullWidth={true} 
                    maxWidth='lg'                                 
                    open={this.props.open}
                    onClose={this.props.onClose}
                    className="share-dialog"                                                                                                                           
                >
                    
                <DialogTitle > Share campaign </DialogTitle>
                              
                </Dialog>
                </Fragment>                   
        )
    }
}

export default ShareCard;