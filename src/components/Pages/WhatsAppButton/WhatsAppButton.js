import React from 'react';
import './WhatsAppButton.css';


function WhatsAppButton(props) {
  const EN = props.EN
  const targetRef = props.targetRef

  const [isVisible, setIsVisible] = React.useState(false)

  const cbFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting)
  }

  const options = React.useMemo(() => {
    return {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(cbFunction, options);
    const currentTarget = targetRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget)
    }
  }, [targetRef, options])

  const contactUs = () => {
    window.location.href = 'https://chat.whatsapp.com/LcSFQzsohaC1hmlgdbij3D';
  }

  return (
    <div className={EN ? "not-visible" : "button"}>
      <button onClick={contactUs} className={!isVisible ? 'contact-us-button' : 'not-visible-button'} >
        {EN ? 'Contact Us' : 'Contáctanos'}
        <i id='icon' className='fab fa-whatsapp'></i>
      </button>
    </div>


  )
}

export default WhatsAppButton;
