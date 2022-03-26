import React from 'react'
import LanguageService from '../../../services/language';
import Author from '../../author'
import './AboutUs.css'
import AboutUsVisuals from './AboutUsVisuals'

function AboutUs() {
    const [EN, setEN] = React.useState(false);

    React.useEffect(() => {
        if(LanguageService.getLanguage()==='en')setEN(true)
        else setEN(false)
    }, []);
    return (
        <div className='about-us-page'>
            <AboutUsVisuals EN={EN}/>
            <Author />
        </div>
    )
}

export default AboutUs
