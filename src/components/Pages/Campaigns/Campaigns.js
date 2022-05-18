import React, {useState} from "react";
import LanguageService from '../../../services/language';
import Author from '../../author';
import "./Campaigns.css"
import CampaignsVisuals from './CampaignsVisuals';

function Campaigns() {

    const [EN, setEN] = useState(false);

    React.useEffect(() => {
        setEN(LanguageService.getLanguage()==="en")
    }, []);

    return (
        <div className='campaigns-page'>
            <CampaignsVisuals 
                EN={EN} />
            <Author />
        </div>
    );
}

export default Campaigns;