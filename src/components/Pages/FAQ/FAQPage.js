import React from 'react'
import FAQVisuals from './FAQVisuals'
import LanguageService from '../../../services/language';
import './FAQPage.css'

function FAQPage() {
    const [EN, setEN] = React.useState(false);

    React.useEffect(() => {
        if(LanguageService.getLanguage()==='en')setEN(true)
        else setEN(false)
    }, []);
    return (
        <div className='faq-page'>
            <FAQVisuals EN={EN}/>
        </div>
    )
}

export default FAQPage
