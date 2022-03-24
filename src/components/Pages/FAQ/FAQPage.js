import React from 'react'
import FAQVisuals from './FAQVisuals'
import LanguageService from '../../../services/language';
import './FAQPage.css';



function FAQPage() {
    const [EN, setEN] = React.useState(false);
    const [language, setLanguage] = React.useState('en');



    React.useEffect(() => {
        if(LanguageService.getLanguage()==='en'){
            setEN(true)
            setLanguage('en')
        }
        else{
            setEN(false)
            setLanguage('es')
        }
    }, []);
    
    return (
        <div>
            <div className='faq-page'>
            <FAQVisuals EN={EN}/>
            </div>
        </div>

    )
}

export default FAQPage
