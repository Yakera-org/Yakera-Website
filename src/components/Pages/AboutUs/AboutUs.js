import React from 'react'
import LanguageService from '../../../services/language';
import Author from '../../author'
import './AboutUs.css'
import AboutUsVisuals from './AboutUsVisuals'
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton.js';

function AboutUs() {
    const [EN, setEN] = React.useState(false);
    const [isVisible] = React.useState(false);

    React.useEffect(() => {
        if(LanguageService.getLanguage()==='en')setEN(true)
        else setEN(false)
    }, []);
    return (
        <div className='about-us-page'>
            <WhatsAppButton EN={EN} isVisible = {isVisible}/>
            <AboutUsVisuals EN={EN}/>
            <Author />
        </div>
    )
}

export default AboutUs
