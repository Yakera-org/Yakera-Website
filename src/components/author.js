import React from 'react';
import { Grid } from '@material-ui/core';
import logo from "../svg/logo.svg";


import './author.css';

function Author() {
    function onImgClick(){
        localStorage.setItem("currentTab", '')
        window.location.href = "/";
    }
    function onLinkClick(event){
        console.log(event.target.name)
        localStorage.setItem("currentTab", event.target.name)
        window.location.href = "/" + event.target.name;
    }
    return (
        <div className='footer'>
            <hr />
            <div className='section'>
                <Grid container spacing={1} style={{ alignItems:'center', textAlign:'center'}}>
                    <Grid item xs={12} sm={4} >
                        <img onClick={onImgClick} src={logo} alt='yakera-logo'/> 
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Grid container spacing={1} style={{ alignItems:'center', textAlign:'center'}}>
                            <Grid item xs={12} sm={4} >
                                <button id='link' name='support' onClick={onLinkClick}>Support Us</button>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <button id='link' name='about' onClick={onLinkClick}>About Us</button>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <button id='link' name='terms' onClick={onLinkClick}>Terms & Conditions</button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={1} >
                        <div></div>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <Grid container spacing={0} style={{ alignItems:'center', textAlign:'center'}}>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={'https://www.facebook.com/Yakera.ve'} rel="noopener noreferrer"  target="_blank">
                                    <i className="fab fa-facebook-square fa-3x" ></i>
                                </a>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={"https://twitter.com/Yakera_ve"} rel="noopener noreferrer"  target="_blank">
                                    <i className="fab fa-twitter-square fa-3x" ></i>
                                </a>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={"https://www.instagram.com/yakera_ve/"} rel="noopener noreferrer"  target="_blank">
                                    <i className="fab fa-instagram fa-3x" ></i>
                                </a>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={"https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767"} rel="noopener noreferrer"  target="_blank">
                                    <i className="fab fa-medium fa-3x" ></i>
                                </a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <hr />
            <div className='section'>
                <p>
                    Yakera Inc. is registered as a tax-exempt 501(c)(4) organization.
                    Please note that under our status as 501(c)(4) we are a non for profit organization devoted to social welfare, but donations made to us are not tax deductible.
                </p>
            </div>

            <hr />
            <div className='section'>
                <p>
                    This page is developed by the <b>Software Engineering Team</b> at <b>Yakera</b> and belongs to the Yakera company
                </p>
            </div>  
        </div>
    )
}

export default Author
