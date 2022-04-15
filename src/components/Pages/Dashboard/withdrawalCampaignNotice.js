import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import {Dialog, Grid} from '@material-ui/core';

const partialImg = "https://yakera-files.s3.us-east-2.amazonaws.com/pictures/partial-withdrawal-notification.png";

class NoticeCard extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }
    componentDidMount() {

        this.setState({
            loaded: true,
        })

    }


    render(){

        if (!this.state.loaded) {
            return (
                <div>
                    Loading
                </div>
            )
        } else {
        return(
            <Fragment >
                <Dialog
                    fullWidth={true}
                    maxWidth='lg'
                    open={this.props.open}
                    onClose={this.props.onClose}
                    className="thanks-dialog"

                >
                <div style = {{backgroundColor : "#ffffff"}}>
                <div className='close-icon' onClick={this.props.onClose} style = {{color:"#252525", float: "right"}}>
                    <i className="fas fa-2x fa-times"></i>
                </div>
                </div>

                
                <div style = {{margin: "50px"}}>
                <Grid container
                 spacing={0}
                 bgcolor= "#ffffff"
                 className = "notice-grid"
                 
                >
                    <Grid item xs={12} sm={12}>
                        <img src = {partialImg} alt='gratitudImage' width = "30%"/>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                    <div style = {{marginTop : "20px"}}>
                    {this.props.EN ? <span> <b>You are about to withdraw the money you've raised for this campaign so far.</b> The campaign will remain active on our platform until you decide to end it.</span>
                    :
                    <span><b>Estás a punto de retirar tus fondos recaudados,</b>" los mismos serán transferidos en un período de 24 a 72 horas. Tu campaña seguirá activa en nuestra plataforma hasta que decidas retirarla. </span>}
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Button className = "thanks-button"
                              onClick={() => this.props.onWithdraw("partial")}
                              style={{
                                margin:'10px',
                                width:'60%',
                                border:'none',
                                backgroundColor:'#ea8737',
                                borderRadius:'30px',
                                color:'white',
                                padding:'10px',
                                fontSize: '10px'
                              }}
                            >
                              <div style = {{textTransform: "capitalize", fontFamily: 'Intro-Regular-Alt', fontSize: "13px"}}>
                                {this.props.EN ? 'End campaign' : 'Cerrar campaña'}
                              </div>
                          </Button>
                          </Grid>
                </Grid>
                </div>
                </Dialog>
            </Fragment>
        )
    }}
}

export default NoticeCard;
