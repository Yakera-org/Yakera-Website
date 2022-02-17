import React, {useState} from 'react';
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';
import Author from '../../author';
import "./EditPage.css"
import EditPageVisual from './EditPageVisual';
import api from "../../../services/api";

import { uploadFile } from 'react-s3';

const _axios = require('axios');
const axios = _axios.create();
const yakeraBackUrl = 'https://api.yakera.org';

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

function EditPage(props) {

    const [loaded, setLoaded] = useState(false);
    const [EN, setEN] = useState(false);
    const [error, setError] = useState("");
    const [profileData, setProfileData] = useState({});
  
    React.useEffect(() => {
        function startup(){
            if(LanguageService.getLanguage()==='en'){
                setEN(true)
            }
            else {
                setEN(false)
            }
            if (TokenService.getLocalAccessToken()) {
                if(TokenService.isDonor()){
                    // only allow donors to this page
                    getInfo();
                }else{
                    // redirect rcipients to their page
                    window.location = '/dashboard';
                }
            } else {
                window.location = '/';
            }
        }
        startup();
    }, []);

    async function getInfo() {
        try {
            const res = await api.get('/profile');
            setProfileData(res.data.data);
            setLoaded(true);
        } catch (err) {
            setLoaded(true);
            TokenService.removeAccessToken()
            TokenService.removeRefreshToken()
            window.location.replace('/login')
        }

        setLoaded(true)
    }

    function handleChange(e){
        if(e.target.name === "location" || e.target.name === "age" || e.target.name === "bio"){
            setProfileData({
                ...profileData,
                user:{
                    ...profileData.user,
                    donorInfo:{
                        ...profileData.user.donorInfo,
                        [e.target.name]: e.target.value
                    }
                }
            })
        }else{
            setProfileData({
                ...profileData,
                user:{
                    ...profileData.user,
                    [e.target.name]: e.target.value
                }
            })
        }
    }


    async function OnSave(){
        console.log(config_aws)
        var profile =  profileData.user.profilePicture;
        if(typeof profileData.user.profilePicture !== 'string'){
            profile = "https://yakera-files.s3.us-east-2.amazonaws.com/profile-pictures/" + profileData.user.profilePicture.name
            //await handleUpload(profileData.user.profilePicture)
        }
        
        console.log(profileData)
    }

    async function handleUpload (file){
        uploadFile(file, config_aws)
            .then(data => console.log(data))
            .catch(err => console.error(err))
      }

    if(!loaded){
        return(
            <div>
                Loading...
            </div>
        )
    }else{
        return (
            <div className='edit'>
                <EditPageVisual EN = {EN} data={profileData} handleChange={handleChange} OnSave={OnSave} error={error}/>
                <br />
                <br />
                <br />
                <br />
                <Author />
            </div>
        );
    }
}

export default EditPage;