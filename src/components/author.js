import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import logo from "../svg/logo.svg";
import datacamplogo from "../pics/datacamplogo.png";
import LanguageService from "../services/language";

import './author.css';

function Author() {

    React.useEffect(() => {
        setLanguage(LanguageService.getLanguage());
    }, [])

    const [language, setLanguage] = React.useState('');

    function onImgClick() {
        localStorage.setItem("currentTab", '')
        window.location.href = "/";
    }
    function onLinkClick(event) {
        console.log(event.target.name)
        localStorage.setItem("currentTab", event.target.name)
        window.location.href = "/" + event.target.name;
    }

    const contactUs = () => {
        window.location.href = 'https://walink.co/6d9a42';
    }

    const sendMail = () => {
        window.location.href = 'mailto: raul@yakera.org'
    }

    var EN;
    if (language === "en") {
        EN = true
    } else {
        EN = false
    }
    return (
        <div className='footer'>
            <hr />
            <div className='section'>
                <Grid container spacing={1} style={{ alignItems: 'center', textAlign: 'center' }}>
                    <Grid item xs={12} sm={3} >
                        <img onClick={onImgClick} src={logo} alt='yakera-logo' />
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        <Grid container spacing={1} style={{ alignItems: 'center', textAlign: 'center' }}>
                            <Grid item xs={3} sm={3} >
                                <button id='link' name='contact' onClick={EN ? sendMail : contactUs}>{EN ? 'Contact Us' : 'Contáctanos'}</button>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <button id='link' name='support' onClick={onLinkClick}>{EN ? 'Support Us' : 'Apóyanos'}</button>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <button id='link' name='about' onClick={onLinkClick}>{EN ? 'About Us' : 'Sobre nosotros'}</button>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <button id='link' name='terms' onClick={onLinkClick}>{EN ? 'Terms & Conditions' : 'Términos y condiciones'}</button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={1} >
                        <div></div>
                    </Grid>
                    <Grid item xs={12} sm={3} >
                        <Grid container spacing={0} style={{ alignItems: 'center', textAlign: 'center' }}>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={'https://www.facebook.com/yakeraorg'} rel="noopener noreferrer" target="_blank">
                                    <i className="fab fa-facebook-square fa-3x" ></i>
                                </a>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={"https://twitter.com/yakeraorg"} rel="noopener noreferrer" target="_blank">
                                    <i className="fab fa-twitter-square fa-3x" ></i>
                                </a>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={"https://www.instagram.com/yakeraorg"} rel="noopener noreferrer" target="_blank">
                                    <i className="fab fa-instagram fa-3x" ></i>
                                </a>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={"https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767"} rel="noopener noreferrer" target="_blank">
                                    <i className="fab fa-medium fa-3x" ></i>
                                </a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <hr />
            <div className='section'>
                {EN ? <p>This page is developed by the <b>Software Engineering Team</b> at <b>Yakera</b> and belongs to the Yakera company.</p> : <p>Esta página está desarrollada por el <b> Equipo de Ingeniería de Software </b> en <b> Yakera </b> y pertenece a la empresa Yakera.</p>}
                <Hidden xsDown>
                    {EN ? <p> Partnering with  <img className='footer-img' alt='datacamp-logo' src={datacamplogo} onClick={() => window.location.href = "https://www.datacamp.com/donates"} />  for data education. </p> : <p> Asociación con  <img className='footer-img' alt='datacamp-logo' src={datacamplogo} />  para la educación de datos.</p>}
                </Hidden>
            </div>
        </div>
    )
}

export default Author
