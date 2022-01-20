import React, { Component, Fragment } from 'react';
import {Dialog, Grid, Hidden} from '@material-ui/core';

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
                <Grid container spacing={0} bgcolor= "#fbefe2" style = {{backgroundColor : "#fbefe2", padding: "30px 60px"}}>
                
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '30vh' }}
                        sm = {6}
                    >

                        <div>
                        
                        <h1 style={{marginTop:'10px', color:'#ea8737'}}> {true ? 'Thank you!' : 'Gracias!'}</h1>
                        <p style = {{color : "#ea8737"}}>
                            Yakera means gratitude in Warao,<br/> and we send you gratitude!
                        </p>

                        <hr width = "50%" color = "#ea8737"/>

                        <p> 
                            
                            {true ? 'Thank you for your donation of ' : 'Gracias por tu donación de'} 
                            
                                <b>
                                    ${this.props.amount}
                                </b> 
                                {true ? ' to the campaign: ' : 'A la campaña: '} <br/>
                                
                                <b>{this.props.title} </b>
                        </p>
                        
                        <a
                            href="https://form.jotform.com/212647238863160"
                            title="Feedback"
                            
                        >
                            <b style={{ color: "#FF9800" }}>Click here </b>to leave us feedback!
                        </a>

                        <button onClick={this.props.onClose} style={{
                            width:'50%',
                            margin:'10px',
                            // marginLeft:'25%',
                            border:'none',
                            backgroundColor:'#ea8737',
                            borderRadius:'30px',
                            color:'white',
                            padding:'10px',
                            fontSize: '13px'
                        }}>
                            Return to Campaign
                        </button>
                        </div>
                        
                    </Grid>
                    <Hidden xsDown>
                    <Grid container
                        spacing={0}
                        // direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '50vh' }}
                        sm = {6}
                        only = "sm"

                    >
                        <img src='https://assets.yakera.org/yakera/illustration-share.webp' alt='gratitudImage' width = "90%"/>
                    
                    </Grid>
                    </Hidden>
                
                </Grid>
                </Dialog>
            </Fragment>                   
        )
    }
}

export default ThanksCard;
