import React, { useState } from 'react';
import SupportUsVisuals from './SupportUsVisuals'
import PaymentVisual from '../CampaignPage/PaymentVisual'
import AirTM from '../CampaignPage/AirTM';
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
                AirTM={AirTM}
                presetAmount={amount}  
                title={"Yakera support"}
            />

            <Author />
        </div>
    )
}

export default SupportUs
