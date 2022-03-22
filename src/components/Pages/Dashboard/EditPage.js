import React, { useState, useEffect } from 'react';
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';
import Author from '../../author';
import "./EditPage.css"
import EditPageVisual from './EditPageVisual';
import api from "../../../services/api";
import { validateFields } from '../Register/Validation';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY

const config_aws = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: 'profile-pictures',
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
}

const EditPage = ({

}) => {
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
    const [zelleCheckbox, setZelleCheckbox] = useState(false);
    
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
            console.log(data)
            setProfileData(data);
            setAirTMEmail(data?.user?.airTMNum);
            setZelleCheckbox(data?.user?.zelleInfo?.isAccepting);
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
        tempError = validateFields.validateEmail(email);
        setAirTMEmailError(tempError)
        if(!tempError){
            return true
        }
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

    const handleChange = (e) => {
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
        const checkZelleEmail = validateZelleEmail(profileData.user.zelleInfo.email);
        const checkZelleName = validateZelleName(profileData.user.zelleInfo.name);
        const checkAirTMEmail = validateAirTMEmail(profileData.user.airTMNum);

        if(zelleEmail !== profileData.user.zelleInfo.email || zelleName !== profileData.user.zelleInfo.name) {
            if(checkZelleEmail && checkZelleName) {
                backendPatch();
            }
        } else if(airTMemail !== profileData.user.airTMNum) {
            if(checkAirTMEmail) {
                backendPatch();
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