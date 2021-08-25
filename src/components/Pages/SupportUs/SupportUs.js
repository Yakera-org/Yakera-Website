import React from 'react'
import SupportUsVisuals from './SupportUsVisuals'
import PaymentVisual from '../CampaignPage/PaymentVisual'
import './SupportUs.css'


function SupportUs() {
    return (
        <div className='support-us-page'>
            <SupportUsVisuals />
            <PaymentVisual />
        </div>
    )
}

export default SupportUs
