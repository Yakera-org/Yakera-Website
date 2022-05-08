import React, { useState, useEffect } from 'react';
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';
import Author from '../../author';
import "./EditPage.css"
import EditPageVisual from './EditPageVisual';
import api from "../../../services/api";
import { validateFields } from '../Register/Validation';

const EditPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [EN, setEN] = useState(false);
    const [success, setSuccess] = useState("");
    const [isSame, setIsSame] = useState(true);

    const [airTMemail, setAirTMEmail] = useState('');
    const [airTMEmailError, setAirTMEmailError] = useState('');
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState({});

    const [zelleEmail, setZelleEmail] = useState('');
    const [zelleEmailError, setZelleEmailError] = useState('');
    const [zelleName, setZelleName] = useState('');
    const [zelleNameError, setZelleNameError] = useState('');
    
    const startup = () => {
        if(LanguageService.getLanguage()==='en'){
            setEN(true)
        }
        else {
            setEN(false)
        }
        if (TokenService.getLocalAccessToken()) {
            if(TokenService.isRecipient()){
                // only allow recipients to this page
                getInfo();
            }else{
                // redirect donors to their page
                window.location = '/donor-hub';
            }
        } else {
            window.location = '/';
        }
    };

    const getInfo = async () => {
        try {
            const res = await api.get('/profile');
            let data = res.data.data
            setProfileData(data);
            setAirTMEmail(data?.user?.airTMNum);
            setZelleEmail(data?.user?.zelleInfo?.email);
            setZelleName(data?.user?.zelleInfo?.name);
        } catch (err) {
            setError('Profile not found');
            TokenService.removeAccessToken()
            TokenService.removeRefreshToken()
            window.location.replace('/login')
        }
        setLoaded(true);
    };

    const validateAirTMEmail = (email) => {
        var tempError;
        tempError = validateFields.validateEmailAllowingEmptyEmail(email);
        setAirTMEmailError(tempError)
        if(!tempError){
            return true;
        }else{
            return false;
        }
    };
    const validateZelleEmail = (email) => {
        var tempEmailError;
        tempEmailError = validateFields.validateEmailAllowingEmptyEmail(email);
        setZelleEmailError(tempEmailError);
        if(!tempEmailError){
            return true;
        }else{
            return false;
        }
    };
    const validateZelleName = (name) => {
        // var tempNameError;
        // tempNameError = validateFields.validateName(name);
        setZelleNameError(false);
        // if(!tempNameError){
        //     return true;
        // }else{
        //     return false;
        // }
        return true;
    };

    const handleChange = (e) => {
        setError("")
        setIsSame(false);
        const eventTargetName = e.target.name;
        const eventTargetVal = e.target.value;
        if(eventTargetName === 'phone' || eventTargetName === 'address') {
            setProfileData({
                ...profileData,
                user: {
                    ...profileData.user,
                    [eventTargetName]: eventTargetVal,
                }
            });
        } else if(eventTargetName === 'airTMNum') {
            validateAirTMEmail(eventTargetVal);
            setProfileData({
                ...profileData,
                user: {
                    ...profileData.user,
                    [eventTargetName]: eventTargetVal,
                }
            });
        } else {
            if(eventTargetName === 'email') {
                validateZelleEmail(eventTargetVal);
            } else if(eventTargetName === 'name') {
                validateZelleName(eventTargetVal);
            }
            setProfileData({
                ...profileData,
                user: {
                    ...profileData.user,
                    zelleInfo: {
                        ...profileData.user.zelleInfo,
                        [eventTargetName]: (eventTargetName === 'isAccepting' ? e.target.checked : eventTargetVal),
                    }
                }
            });
        }
    };

    const onSubmit = () => {
        setLoading(true);
        const checkZelleEmail = validateZelleEmail(profileData.user.zelleInfo ? profileData.user.zelleInfo.email : "");
        const checkZelleName = validateZelleName(profileData.user.zelleInfo ? profileData.user.zelleInfo.name : "");
        const checkAirTMEmail = validateAirTMEmail(profileData.user.airTMNum ? profileData.user.airTMNum : "");

        if(zelleEmail !== profileData.user?.zelleInfo?.email || zelleName !== profileData.user?.zelleInfo?.name) {
            if(checkZelleEmail && checkZelleName) {
                backendPatch();
            }else{
                setError(EN ? "Please check the fields are filled correctly" : "Por favor, compruebe que los campos están rellenados correctamente")
                setLoading(false)
            }
        } else if(airTMemail !== profileData.user.airTMNum) {
            if(checkAirTMEmail) {
                backendPatch();
            }else{
                setError(EN ? "Please check the fields are filled correctly" : "Por favor, compruebe que los campos están rellenados correctamente")
                setLoading(false)
            }
        } else {
            backendPatch();
        }
    };

    const backendPatch = async () => {
        try {
            const requestBody = {
                address: profileData.user.address,
                phone: profileData.user.phone,
                airTMNum: profileData.user.airTMNum,
                zelleInfo: {
                    email: profileData.user.zelleInfo.email,
                    name: profileData.user.zelleInfo.name,
                    isAccepting: profileData.user.zelleInfo.isAccepting,
                },
            };
            console.log(requestBody)
            await api.patch('/profile/update', requestBody);
            setSuccess('Profile updated');
        } catch (err) {
            console.log('Error. ' + err)
            setError("Something went wrong, please try again.");
        }
        setLoading(false);
        setIsSame(true);
    };

    useEffect(() => {
      startup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    if(!loaded) {
        return(
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className='edit'>
            <EditPageVisual 
                profileData={profileData}
                EN={EN}
                handleChange={handleChange}
                onSubmit={onSubmit}
                airTMEmailError={airTMEmailError}
                zelleEmailError={zelleEmailError}
                zelleNameError={zelleNameError}
                isSame={isSame}
                error={error}
                success={success}
                loading={loading}
            />
            <br />
            <br />
            <br />
            <br />
            <Author />
        </div>
  )
};

export default EditPage;