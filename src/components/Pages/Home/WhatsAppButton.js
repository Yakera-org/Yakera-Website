import React from 'react';
import './WhatsAppButton.css';


function WhatsAppButton(props) {
  const EN = props.EN
  const isVisible = props.isVisible;

  const contactUs = () => {
      window.location.href = 'https://chat.whatsapp.com/LcSFQzsohaC1hmlgdbij3D';
  }

  return (
    <button onClick={contactUs} className={!isVisible ? 'contact-us-button' : 'not-visible-button'} >
    {EN ? 'Contact Us' : 'Contáctanos'}
    <i id='icon' className='fab fa-whatsapp'></i>
    </button>


  )
}

export default WhatsAppButton;
