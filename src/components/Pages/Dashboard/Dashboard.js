import React, {useState} from 'react';
import DashboardVisuals from './DashboardVisuals';
import { validateFields } from '../Register/Validation';

import './Dashboard.css';
import api from "../../../services/api";
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';

function Dashboard() {

    const [loaded, setLoaded] = useState(false);
    const [EN, setEN] = useState(false);
    const [airTMemail, setAirTMEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState({});

    React.useEffect(() => {
        startup()
        
    });
    function startup(){
        if(LanguageService.getLanguage()==='en'){
            setEN(true)
        }
        else {
            setEN(false)
        }
        if (localStorage.getItem('accessToken')) {
            getCampaign();
        } else {
            window.location = '/';
        }
    }
    async function getCampaign() {
        try {
            const res = await api.get('/profile');
            setProfileData(res.data.data);
            setLoaded(true);
        } catch (err) {
            setError('Profile not found');
            setLoaded(true);
            TokenService.removeAccessToken()
            TokenService.removeRefreshToken()
            window.location.replace('/login')
        }
    }

    async function onWithdraw(event){
        let slug = event.target.name;
        try {
            await api.delete(`/campaigns/${slug}`);
            window.alert(EN ? 'Campaign successfully withdrawn!' : '¡Campaña retirada con éxito!')
            window.location.reload();
        } catch (err) {
            console.log('Error. ' + err)
        }
    }

    function handleChange(event){
        validate(event.target.value)
        setAirTMEmail(event.target.value)
    }
    function validate(email){
        var tempError;
        tempError = validateFields.validateEmail(email);
        setEmailError(tempError)
        if(!tempError){
            return true
        }
    }
    function onSubmitEmail(){
        if(validate(airTMemail)){
            backendPatch()
        }
    }

    async function backendPatch(){
        try {
            const requestBody = {      
                airTMNum: airTMemail
              }
          
            await api.patch('/profile/update', requestBody);
            window.location.reload();   
        } catch (err) {
            console.log('Error. ' + err)
        }
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
                <DashboardVisuals EN={EN} data={profileData} onWithdraw={onWithdraw} handleChange={handleChange} emailError={emailError} onSubmitEmail={onSubmitEmail}/>
            </div>
        )
    }
}

export default Dashboard    
