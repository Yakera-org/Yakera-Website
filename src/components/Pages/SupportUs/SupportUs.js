import React, { useState, useEffect } from 'react';
import SupportUsVisuals from './SupportUsVisuals'
import PaymentVisual from '../CampaignPage/PaymentVisual'
import './SupportUs.css'
import Author from '../../author'


function SupportUs() {

    const [amount, setAmount] = useState('');
    
    return (
        <div className='support-us-page'>
            <SupportUsVisuals 
                setAmount={setAmount}
            />
            
            <hr id='support-us-bottom-hr'/>

            <PaymentVisual 
                language='en'
                presetAmount={amount}  
            />

            <Author />
        </div>
    )
}

export default SupportUs
