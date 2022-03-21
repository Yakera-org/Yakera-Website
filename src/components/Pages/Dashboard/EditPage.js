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
            setProfileData(data);
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

    const handleChangeAirTMEmail = (event) => {
        validateAirTMEmail(event.target.value)
        setAirTMEmail(event.target.value)
    };
    const validateAirTMEmail = (email) => {
        var tempError;
        tempError = validateFields.validateEmail(email);
        setAirTMEmailError(tempError)
        if(!tempError){
            return true
        }
    };
    const onSubmitAirTM = () => {
        if(validateAirTMEmail(airTMemail)){
            backendPatch()
        }
    };

    const handleChangeZelleCheckbox = (e) => {
        setZelleCheckbox(e.target.checked);
    };
    const handleChangeZelleEmail = (e) => {
        console.log(e.target.value)
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

    const backendPatch = async () => {
        try {
            const requestBody = {      
                airTMNum: airTMemail,
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
                handleChangeAirTMEmail={handleChangeAirTMEmail}
                airTMEmailError={airTMEmailError}
                onSubmitAirTM={onSubmitAirTM}
                handleChangeZelleCheckbox={handleChangeZelleCheckbox}
                handleChangeZelleEmail={handleChangeZelleEmail}
                handleChangeZelleName={handleChangeZelleName}
                zelleEmailError={zelleEmailError}
                zelleNameError={zelleNameError}
                zelleCheckbox={zelleCheckbox}
                onSubmitZelle={onSubmitZelle}
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