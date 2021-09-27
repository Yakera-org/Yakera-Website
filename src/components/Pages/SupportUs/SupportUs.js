import React, { useState } from 'react';
import SupportUsVisuals from './SupportUsVisuals'
import PaymentVisual from '../CampaignPage/PaymentVisual'
import AirTM from '../CampaignPage/AirTM';
import './SupportUs.css'
import Author from '../../author'
import LanguageService from '../../../services/language';


function SupportUs() {

    const [amount, setAmount] = useState('');

    const [EN, setEN] = React.useState(false);

    React.useEffect(() => {
        if(LanguageService.getLanguage()==='en')setEN(true)
        else setEN(false)
    }, []);
    return (
        <div className='support-us-page'>
            <SupportUsVisuals 
                EN={EN}
                setAmount={setAmount}
            />
            
            <hr id='support-us-bottom-hr'/>

            <PaymentVisual 
                language='en'
                AirTM={AirTM}
                presetAmount={amount}  
                title={"Yakera support"}
                slug={'yakera'} // 'yakera' slug is a global campaign for tracking donations to Yakera website
            />

            <Author />
        </div>
    )
}

export default SupportUs
