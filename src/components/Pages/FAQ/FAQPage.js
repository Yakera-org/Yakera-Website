import React from 'react'
import FAQVisuals from './FAQVisuals'
import LanguageService from '../../../services/language';
import './FAQPage.css';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton.js';

function FAQPage() {
    const [EN, setEN] = React.useState(false);
    const [language, setLanguage] = React.useState('en');

    
    const [isVisible, setIsVisible] = React.useState(false)

    const cbFunction = (entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting)
    }

    const options = React.useMemo(() => {
      return{
        root: null,
        rootMargin: '0px',
        threshold: 0.3
      }
    }, []);

    const targetRef = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(cbFunction, options);
      const currentTarget = targetRef.current;
      if(currentTarget) observer.observe(currentTarget);

      return () => {
        if(currentTarget) observer.unobserve(currentTarget)
      }
    }, [targetRef, options])


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
            <WhatsAppButton EN={EN} isVisible = {isVisible}/>
            <div className='faq-page'>
            <FAQVisuals EN={EN}/>
            </div>
        </div>

    )
}

export default FAQPage
