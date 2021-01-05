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

export default Thankscard;