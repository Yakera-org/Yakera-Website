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
                    className="welcome-dialog"  
                                                                                                                                    
                >
                    Welcome! 
                </Dialog>
                </Fragment>                   
        )
    }
}

export default Thankscard;