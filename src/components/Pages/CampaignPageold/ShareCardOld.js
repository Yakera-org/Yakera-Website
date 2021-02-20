import React, { Component, Fragment } from 'react';
import {Dialog, Grid} from '@material-ui/core';
import classnames from 'classnames';


class ShareCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            loaded: false,
            language: "en"
        }
        this.hanldeCopy = this.hanldeCopy.bind(this);
    }

    hanldeCopy(){
        navigator.clipboard.writeText(window.location.href);
        this.setState({
            copied: true
        })
    }
    componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        this.setState({
            loaded: true,
            language: lang
        })
    }
    render(){ 
        let copied;
       
        if(this.state.copied){
            copied = <p className="copied">Copied!</p>
        }
        if(!this.state.loaded){
            return(
                <div>
                    Loading
                </div>
            )
        }else{

            var EN = true //is english
            if(this.state.language === 'en'){
                EN = true
            }else{
                EN = false
            }

            return(
                <Fragment >
                    <Dialog
                        fullWidth={true} 
                        maxWidth='lg'                                 
                        open={this.props.open}
                        onClose={this.props.onClose}
                        className="share-dialog"                                                                                                                           
                    >
                        
                    <h1 >{EN ? 'Help by sharing' : 'Ayuda compartiendo'} </h1>
                    <p id="share-help"> {EN ? 'Fundraisers shared on social networks raise up to 5 times more!' : '¡Las recaudaciones de fondos compartidas en las redes sociales recaudan hasta 5 veces más!'} </p>
                    <hr style={{width:'80%'}}/>
                    <Grid container spacing={0}>
                        <Grid item xs={8} sm={8}>
                            <input
                            type="text"
                            name="share-url"
                            value={window.location.href}
                            className={classnames(
                                'form-control'
                            )} 
                            style={{marginLeft:'15%', marginBottom:'15px', width:'90%'}}  
                            onClick={this.hanldeCopy}                                  
                            />
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <button
                                type="submit"
                                className="btn btn-secondary btn-block copy-btn"    
                                style={{marginLeft:'25%', width:'50%'}} 
                                onClick={this.hanldeCopy}                   
                                >
                                {EN ? 'Copy!' : 'Copia!'}
                            </button>
                        </Grid>
                    </Grid>  
                    {copied}            
                    </Dialog>
                    </Fragment>                   
            )
        }
    }
}

export default ShareCard;