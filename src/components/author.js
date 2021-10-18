import React from 'react';
import { Grid } from '@material-ui/core';
import logo from "../svg/logo.svg";
import LanguageService from "../services/language";

import './author.css';

function Author() {

    React.useEffect(() =>{
        setLanguage(LanguageService.getLanguage());
    }, [])

    const [language, setLanguage] = React.useState('');

    function onImgClick(){
        localStorage.setItem("currentTab", '')
        window.location.href = "/";
    }
    function onLinkClick(event){
        console.log(event.target.name)
        localStorage.setItem("currentTab", event.target.name)
        window.location.href = "/" + event.target.name;
    }

    const contactUs = () => {
        window.location.href = 'https://chat.whatsapp.com/LcSFQzsohaC1hmlgdbij3D';
    }

    var EN;
    if(language === "en"){
        EN = true
    }else{
        EN = false
    }
    return (
        <div className='footer'>
            <hr />
            <div className='section'>
                <Grid container spacing={1} style={{ alignItems:'center', textAlign:'center'}}>
                    <Grid item xs={12} sm={3} >
                        <img onClick={onImgClick} src={logo} alt='yakera-logo'/>
                    </Grid>
                    <Grid item xs={12} sm={5} >
                        <Grid container spacing={1} style={{ alignItems:'center', textAlign:'center'}}>
                            <Grid item xs={3} sm={3} >
                                <button id='link' name='contact' onClick={contactUs}>{EN ? 'Contact Us' : 'Contáctanos'}</button>
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
                        <Grid container spacing={0} style={{ alignItems:'center', textAlign:'center'}}>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={'https://www.facebook.com/yakeraorg'} rel="noopener noreferrer"  target="_blank">
                                    <i className="fab fa-facebook-square fa-3x" ></i>
                                </a>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={"https://twitter.com/yakeraorg"} rel="noopener noreferrer"  target="_blank">
                                    <i className="fab fa-twitter-square fa-3x" ></i>
                                </a>
                            </Grid>
                            <Grid item xs={3} sm={3} >
                                <a id="icon" href={"https://www.instagram.com/yakeraorg"} rel="noopener noreferrer"  target="_blank">
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
                    {EN ? 'Yakera Inc. is registered as a tax-exempt 501(c)(4) organization.' : 'Yakera Inc. está registrada como una organización 501 (c) (4) exenta de impuestos.'}
                    {EN ? 'Please note that under our status as 501(c)(4) we are a non for profit organization devoted to social welfare, but donations made to us are not tax deductible.' : 'Tenga en cuenta que, en virtud de nuestra condición de 501 (c) (4), somos una organización sin fines de lucro dedicada al bienestar social, pero las donaciones que se nos hagan no son deducibles de impuestos.'}
                    
                </p>
            </div>

            <hr />
            <div className='section'>
                {EN ? <p>This page is developed by the <b>Software Engineering Team</b> at <b>Yakera</b> and belongs to the Yakera company</p> : <p>Esta página está desarrollada por el <b> Equipo de Ingeniería de Software </b> en <b> Yakera </b> y pertenece a la empresa Yakera</p>} 
            </div>  
        </div>
    )
}

export default Author
