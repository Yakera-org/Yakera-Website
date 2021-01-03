import React, { Component, Fragment } from 'react';
import { Dialog } from '@material-ui/core';
import './sharecard.css';

class Thankscard extends Component{
  
    render(){
        return(
            <Fragment >
                <Dialog
                    fullWidth={true} 
                    maxWidth='lg'                                 
                    open={this.props.open}
                    onClose={this.props.onClose}
                                                                                                                                    
                >
                    
                <iframe src={"../consent.html"} title="consentform"
                style={{
                    padding:'20px 20px',
                    height:'700px'
                }} />
                <br />

                <button
                    type="submit"
                    className="btn btn-secondary btn-block yakera-donate-start-btn"    
                    onClick={this.props.onClose}                   
                    >
                    return
                </button> 
                  
                </Dialog>
                </Fragment>                   
        )
    }
}

export default Thankscard;