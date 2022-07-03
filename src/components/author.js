import React, { useState, useEffect } from 'react';
import logo from "../svg/logo.svg";
import datacamplogo from "../pics/datacamplogo.png";
import LanguageService from "../services/language";

import './author.css';

function Author() {
    const [language, setLanguage] = useState('');
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSize = () => {
        setWidth(window.innerWidth);
    }

    let isMobile = width < 700 ? true : false;

    useEffect(() => {
        setLanguage(LanguageService.getLanguage());

        window.addEventListener('resize', handleWindowSize);
        return () => window.removeEventListener('resize', handleWindowSize);
    }, [])

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

    let bottomSectionClass = isMobile ? 'section section-mobile' : 'section';

    return (
        <div className='footer'>
            <hr />
            <div className='section'>
                <div className="col">
                    <div className="row justify-content-between">
                        {isMobile
                        ?
                        <img onClick={onImgClick} src={logo} alt='yakera-logo' className="yakera-footer-logo-mobile left-margin" />
                        :
                        <>
                        <img onClick={onImgClick} src={logo} alt='yakera-logo' className="yakera-footer-logo left-margin" />
                        <div className="row">
                            <div className="mr-2">
                                <button id='link' name='contact' onClick={EN ? sendMail : contactUs}>{EN ? 'Contact Us' : 'Contáctanos'}</button>
                            </div>
                            <div className="mx-2">
                                <button id='link' name='about' onClick={onLinkClick}>{EN ? 'About Us' : 'Sobre nosotros'}</button>
                            </div>
                            <div className="ml-2">
                                <button id='link' name='terms' onClick={onLinkClick}>{EN ? 'Terms & Conditions' : 'Términos y condiciones'}</button>
                            </div>
                        </div>
                        </>}
                        <div className="row right-margin">
                            <div className="mr-1">
                                <a id="icon" href={'https://www.facebook.com/yakeraorg'} rel="noopener noreferrer" target="_blank">
                                    <i className="fab fa-facebook-square fa-3x icon-color" ></i>
                                </a>
                            </div>
                            <div className="mx-1">
                                <a id="icon" href={"https://twitter.com/yakeraorg"} rel="noopener noreferrer" target="_blank">
                                    <i className="fab fa-twitter-square fa-3x icon-color" ></i>
                                </a>
                            </div>
                            <div className="ml-1">
                                <a id="icon" href={"https://www.instagram.com/yakeraorg"} rel="noopener noreferrer" target="_blank">
                                    <i className="fab fa-instagram fa-3x icon-color" ></i>
                                </a>
                            </div>
                            {/*
                            <div className="ml-1">
                                <a id="icon" href={"https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767"} rel="noopener noreferrer" target="_blank">
                                    <i className="fab fa-medium fa-3x icon-color" ></i>
                                </a>
                            </div>
                            */}
                        </div>
                    </div>
                </div>
            </div>

            {isMobile ? '' : <hr />}

            <div className={bottomSectionClass}>
                {/*EN ? <p>This page is developed by the <b>Software Engineering Team</b> at <b>Yakera</b> and belongs to the Yakera company.</p> : <p>Esta página está desarrollada por el <b> Equipo de Ingeniería de Software </b> en <b> Yakera </b> y pertenece a la empresa Yakera.</p>*/}
                {isMobile
                ?
                <div className="col">
                    <div className="row">
                        <button className="mobile-btn" id='link' name='contact' onClick={EN ? sendMail : contactUs}>{EN ? 'Contact Us' : 'Contáctanos'}</button>
                    </div>
                    <div className="row">
                        <button className="mobile-btn" id='link' name='about' onClick={onLinkClick}>{EN ? 'About Us' : 'Sobre nosotros'}</button>
                    </div>
                    <div className="row justify-content-between">
                        <button className="mobile-btn" id='link' name='terms' onClick={onLinkClick}>{EN ? 'Terms & Conditions' : 'Términos y condiciones'}</button>
                        <p className="footer-text copyright">© 2022 Yakera</p>
                    </div>
                </div>
                :
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6">
                        {EN ? <p className="footer-text">Partnering with <img className='footer-img' alt='datacamp-logo' src={datacamplogo} onClick={() => window.location.href = "https://www.datacamp.com/donates"} /> for data education.</p> : <p>Asociación con <img className='footer-img' alt='datacamp-logo' src={datacamplogo} /> para la educación de datos.</p>}
                    </div>
                    <div className="col right-margin">
                        <p className="footer-text copyright">© 2022 Yakera</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Author
