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
    const [reserveName, setReserveName] = useState('');
    const [reserveNameError, setReserveNameError] = useState('');
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState({});

    const [zelleEmail, setZelleEmail] = useState('');
    const [zelleEmailError, setZelleEmailError] = useState('');
    const [zelleName, setZelleName] = useState('');
    const [zelleNameError, setZelleNameError] = useState('');
    const [zelleCheckbox, setZelleCheckbox] = useState(false);

    React.useEffect(() => {
        function startup(){
            if(LanguageService.getLanguage()==='en'){
                setEN(true)
            }
            else {
                setEN(false)
            }
            if (TokenService.getLocalAccessToken()) {
                if(TokenService.isRecipient()){
                    // only allow recipients to this page
                    getCampaign();
                }else{
                    // redirect donors to their page
                    window.location = '/donor-hub';
                }
                
            } else {
                window.location = '/';
            }
        }
        startup(); 
    }, []);
    
    async function getCampaign() {
        try {
            const res = await api.get('/profile');
            let data = res.data.data
            console.log(data)
            setProfileData(data);
            setZelleCheckbox(data?.user?.zelleInfo?.isAccepting)
            setZelleEmail(data?.user?.zelleInfo?.email)
            setZelleName(data?.user?.zelleInfo?.name)
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
        const res = await api.get(`/campaigns/${slug}`);
        const requestBody = {
            slug: slug,
            amount: res.data.data.raised,
            campaignAmountAtMoment: res.data.data.raised, // For future iterations
        }
        try {
            await api.post(`/campaigns/withdrawn`, requestBody);
            window.alert(EN ? 'Campaign successfully withdrawn!' : '¡Campaña retirada con éxito!')
            window.location.reload();
        } catch (err) {
            console.log('Error. ' + err)
        }
    }

    function handleChange(event){
        validate(event.target.value)
        setReserveName(event.target.value)
    }
    function validate(email){
        var tempError;
        tempError = validateFields.validateEmail(email);
        setReserveNameError(tempError)
        if(!tempError){
            return true
        }
    }
    function onSubmitEmail(){
        if(validate(reserveName)){
            backendPatch()
        }
    }

    const handleChangeZelleCheckbox = (e) => {
        setZelleCheckbox(e.target.checked);
    };
    const handleChangeZelleEmail = (e) => {
        validateZelleEmail(e.target.value);
        setZelleEmail(e.target.value);
    };
    const handleChangeZelleName = (e) => {
        validateZelleName(e.target.value);
        setZelleName(e.target.value);
    };
    const validateZelleEmail = (email) => {
        var tempEmailError;
        tempEmailError = validateFields.validateEmail(email);
        setZelleEmailError(tempEmailError);
        if(!tempEmailError){
            return true;
        }
    };
    const validateZelleName = (name) => {
        var tempNameError;
        tempNameError = validateFields.validateName(name);
        setZelleNameError(tempNameError);
        if(!tempNameError){
            return true;
        }
    }
    const onSubmitZelle = () => {
        let checkEmail = validateZelleEmail(zelleEmail);
        let checkName = validateZelleName(zelleName);
        if( checkEmail && checkName){
            backendPatch();
        }else{
            console.log("Error")
        }

    };

    async function backendPatch(){
        try {
            const requestBody = {      
                reserveUsername: reserveName,
                zelleInfo: {
                    email: zelleEmail,
                    name: zelleName,
                    isAccepting: zelleCheckbox,
                },
            };
            console.log(requestBody)
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
                <DashboardVisuals
                    EN={EN}
                    data={profileData}
                    onWithdraw={onWithdraw}
                    handleChange={handleChange}
                    reserveNameError={reserveNameError}
                    onSubmitEmail={onSubmitEmail}
                    handleChangeZelleCheckbox={handleChangeZelleCheckbox}
                    handleChangeZelleEmail={handleChangeZelleEmail}
                    handleChangeZelleName={handleChangeZelleName}
                    zelleEmailError={zelleEmailError}
                    zelleNameError={zelleNameError}
                    zelleCheckbox={zelleCheckbox}
                    onSubmitZelle={onSubmitZelle}
                />
            </div>
        )
    }
}

export default Dashboard    
