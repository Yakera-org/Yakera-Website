import React, { Component, Fragment } from 'react';
import {Dialog} from '@material-ui/core';

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
                <div className = 'thanks-dialog-wrapper'>
                
                <div className = 'thanks-text-wrapper'>
                    
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
                    borderRadius:'30px',
                    color:'white',
                    padding:'10px',
                }}>
                    Return to Campaign
                </button>
                </div>
                <img src='https://assets.yakera.org/yakera/illustration-share.webp' alt='gratitudImage' className='share-img' />
                </div>
                </Dialog>
            </Fragment>                   
        )
    }
}

export default ThanksCard;
