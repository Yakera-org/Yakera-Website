import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import {Dialog, Grid, Hidden} from '@material-ui/core';
import { Link } from 'react-router-dom';
import './NoticeCard.css'

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
                <div style = {{backgroundColor : "white"}}>
                <div className='close-icon' onClick={this.props.onClose} style = {{color:"#252525", float: "right"}}>
                    <i className="fas fa-2x fa-times"></i>
                </div>
                </div>

                <img src = {endImg} alt='gratitudImage' width = "90%"/>

                <Grid container
                 spacing={0}
                 bgcolor= "white"
                 className = "notice-grid"
                >
                    <Grid item></Grid>
                </Grid>
                </Dialog>
            </Fragment>
        )
    }}
}

export default NoticeCard;
