import React from 'react'
import FAQVisuals from './FAQVisuals'
import './FAQPage.css'

function FAQPage(props) {
    const EN = props.EN
    return (
        <div className='faq-page'>
            <FAQVisuals EN={EN}/>
        </div>
    )
}

export default FAQPage
