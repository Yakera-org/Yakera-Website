import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import {Dialog, Grid, Hidden} from '@material-ui/core';
import { Link } from 'react-router-dom';

const endImg = "https://yakera-files.s3.us-east-2.amazonaws.com/pictures/end-campaign-notification.png";
const partialImg = "https://yakera-files.s3.us-east-2.amazonaws.com/pictures/partial-withdrawal-notification.png";

class NoticeCard extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        const type = this.props.type;
    }
    componentDidMount() {

        this.setState({
            loaded: true,
        })


    }


    render(){
        //var token = localStorage.getItem('accessToken');
        var loggedIn = false;
        var token = localStorage.getItem('accessToken');

        if(token === null){
          loggedIn = true;
        }

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
                 xs={12} sm={12}
                >
                    <Grid item xs={12} sm={12}>
                        <img src = {endImg} alt='gratitudImage' width = "50%"/>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                    <div style = {{marginTop : "20px"}}>
                    {this.props.EN ? <span> <b>You are about to end this campaign.</b> All of the money you've raised will be transferred to your AirTM account within 24 to 72 hours.</span>
                    :
                    "Estás a punto de cerrar tu campaña. Todos tus fondos recaudados serán transferidos a tu cuenta de AirTM en un período de 24 a 72 horas."}
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Button className = "thanks-button"
                              component={Link}
                              to="/register"
                              style={{
                                margin:'10px',
                                width:'40%',
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
