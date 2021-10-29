import React, { Component, Fragment } from 'react';
import {Dialog} from '@material-ui/core';

const bg_pic = "https://assets.yakera.org/yakera/thankyoucard.webp"
class ThanksCard extends Component{
  
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
                    <img src={bg_pic} width="100%" alt="background-pic" />
                    
                <h1 style={{marginTop:'10px', color:'#072147'}}> {true ? 'Thank you!' : 'Gracias!'}</h1>
                <p> {true ? 'Thank you for your donation of' : 'Gracias por tu donación de'} <b>${this.props.amount}</b> {true ? 'To the campaign: ' : 'A la campaña: '} {this.props.title} </p>
                
                <a
                    href="https://form.jotform.com/212647238863160"
                    title="Feedback"
                    
                >
                    Click<b style={{ color: "#FF9800" }}> here </b>to leave us feedback!
                </a>

                <button onClick={this.props.onClose} style={{
                    width:'50%',
                    margin:'10px',
                    marginLeft:'25%',
                    border:'none',
                    backgroundColor:'#01224d',
                    borderRadius:'10px',
                    color:'white',
                    padding:'10px',
                }}>
                    Return to Campaign
                </button>
                  
                </Dialog>
            </Fragment>                   
        )
    }
}

export default ThanksCard;
