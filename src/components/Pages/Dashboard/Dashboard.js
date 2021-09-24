import React, {useState} from 'react';
import DashboardVisuals from './DashboardVisuals';
import { validateFields } from '../Register/Validation';

import './Dashboard.css';
import api from "../../../services/api";

function Dashboard() {

    const [loaded, setLoaded] = useState(false);
    const [airTMemail, setAirTMEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState({});

    React.useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            getCampaign();
        } else {
            window.location = '/';
        }
    }, []);

    async function getCampaign() {
        try {
            const res = await api.get('/profile');
            setProfileData(res.data.data);
            setLoaded(true);
        } catch (err) {
            setError('Profile not found');
            setLoaded(true);
        }
    }

    async function onWithdraw(event){
        let slug = event.target.name;
        await api.delete(`/campaigns/${slug}`);

        window.alert('Campaign successfully withdrawn!')
        window.location.reload();
    }

    function handleChange(event){
        var tempError;
        tempError = validateFields.validateEmail(event.target.value);
        setEmailError(tempError)
        setAirTMEmail(event.target.value)
    }
    function onSubmitEmail(){
        console.log(airTMemail)
    }
    if (!loaded){
        return(
            <p style={{marginTop:'150px'}}>
                Loading ...
            </p>
        )
    }else if (error){
        return(
            <p style={{marginTop:'150px'}}>
                {error}
            </p>
        )
    }else{        
        return (
            <div className='dashboard-page'>
                <DashboardVisuals data={profileData} onWithdraw={onWithdraw} handleChange={handleChange} emailError={emailError} onSubmitEmail={onSubmitEmail}/>
            </div>
        )
    }
}

export default Dashboard    
