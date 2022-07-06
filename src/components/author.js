import React, { useState, useEffect } from 'react';
import logo from "../svg/logo.svg";
import datacamplogo from "../pics/datacamplogo.png";
import LanguageService from "../services/language";

import './author.css';

const socialMedia = [
    {iconLink: 'https://www.facebook.com/yakeraorg', iconClass: 'fa-facebook-square'},
    {iconLink: 'https://twitter.com/yakeraorg', iconClass: 'fa-twitter-square'},
    {iconLink: 'https://www.instagram.com/yakeraorg', iconClass: 'fa-instagram'},
    // {iconLink: 'https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767', iconClass: 'fa-medium'},
];

function SocialMediaIcon(props) {
    return (
        <div className={`m${props.iconMargin}-1`}>
            <a id="icon" href={props.iconLink} rel="noopener noreferrer" target="_blank">
                <i className={`fab ${props.iconClass} fa-3x footer-icon`} ></i>
            </a>
        </div>
    );
}

function Author() {
    const [EN, setEN] = useState(LanguageService.getLanguage() === 'en');
    const [width, setWidth] = useState(window.innerWidth);

    const handleWindowSize = () => {
        setWidth(window.innerWidth);
    }

    let isMobile = width < 700 ? true : false;

    useEffect(() => {
        setEN(LanguageService.getLanguage() === 'en');

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

    const datacampLink = () => {
        window.location.href = 'https://www.datacamp.com/donates';
    }

    let copyrightText = `© ${new Date().getFullYear()} Yakera`;

    let socialMediaIcons = [];

    socialMedia.forEach((value, index) => {
        let iconMargin;

        if (index === 0) {
            iconMargin = 'r';
        }
        else if (index === socialMedia.length - 1) {
            iconMargin = 'l';
        }
        else {
            iconMargin = 'x';
        }

        socialMediaIcons.push(<SocialMediaIcon iconMargin={iconMargin} iconLink={value.iconLink} iconClass={value.iconClass} />)
    });

    return (
        <div className='footer'>
            <hr />
            <div className='section'>
                <div className="col">
                    <div className="row justify-content-between">
                        <img onClick={onImgClick} src={logo} alt='yakera-logo' className={`yakera-footer-logo${isMobile ? '-mobile' : ''} left-margin`} />
                        {isMobile
                        ?
                        ''
                        :
                        <div className="row">
                            <div className="mr-2 vertical-align">
                                <button id='link' name='contact' onClick={EN ? sendMail : contactUs}>{EN ? 'Contact Us' : 'Contáctanos'}</button>
                            </div>
                            <div className="mx-2 vertical-align">
                                <button id='link' name='about' onClick={onLinkClick}>{EN ? 'About Us' : 'Sobre nosotros'}</button>
                            </div>
                            <div className="ml-2 vertical-align">
                                <button id='link' name='terms' onClick={onLinkClick}>{EN ? 'Terms & Conditions' : 'Términos y condiciones'}</button>
                            </div>
                        </div>}
                        <div className="row right-margin">
                            {socialMediaIcons}
                        </div>
                    </div>
                </div>
            </div>

            {isMobile ? '' : <hr />}

            <div className={`section${isMobile ? ' section-mobile' : ''}`}>
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
                        <p className="footer-text copyright">{copyrightText}</p>
                    </div>
                </div>
                :
                <div className="row">
                    <div className="col"></div>
                    <div className="col-6 datacamp">
                        <p className="footer-text">
                            {EN ? 'Partnering with ' : 'Asociación con '}
                            <img className='footer-img' alt='datacamp-logo' src={datacamplogo} onClick={datacampLink} />
                            {EN ? ' for data education.' : ' para la educación de datos.'}
                        </p>
                    </div>
                    <div className="col right-margin">
                        <p className="footer-text copyright">{copyrightText}</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Author
