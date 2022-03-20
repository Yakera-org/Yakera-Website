import React, { useState, useEffect } from 'react';
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';
import Author from '../../author';
import "./EditPage.css"
import EditPageVisual from './EditPageVisual';
import api from "../../../services/api";

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
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [profileData, setProfileData] = useState({});
    const [isSame, setIsSame] = useState(true);
    
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
            setProfileData(res.data.data);
        } catch (err) {
            TokenService.removeAccessToken();
            TokenService.removeRefreshToken();
            window.location.replace('/login');
        }

        setLoaded(true);
    };

    // TODO: Bring functions from Dashboard.js to here

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