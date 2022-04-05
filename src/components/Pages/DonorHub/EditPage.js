import React, {useState} from 'react';
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';
import Author from '../../author';
import "./EditPage.css"
import EditPageVisual from './EditPageVisual';
import api from "../../../services/api";

import S3 from "aws-s3";

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
const S3Client = new S3(config_aws);
function EditPage(props) {

    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [EN, setEN] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [profileData, setProfileData] = useState({});
    const [isSame, setIsSame] = useState(true);
    const [profileImage, setProfileImage] = useState("");
  
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
            setProfileImage(res.data.data.user.profilePicture)
        } catch (err) {
            TokenService.removeAccessToken()
            TokenService.removeRefreshToken()
            window.location.replace('/login')
        }

        setLoaded(true)
    }

    function handleChange(e){
        setIsSame(false)
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
        setLoading(true)
        var profile =  profileData.user.profilePicture;
        if("https://yakera-files.s3.us-east-2.amazonaws.com/profile-pictures/" + profileData.user.profilePicture.name !== profileImage){
            if(typeof profileData.user.profilePicture !== 'string' ){
                await S3Client.uploadFile(profileData.user.profilePicture)
                .then(data =>{
                    profile = "https://yakera-files.s3.us-east-2.amazonaws.com/" + data.key
                    })
                    .catch(err => console.error(err))
                    }
        }else{
            profile = "https://yakera-files.s3.us-east-2.amazonaws.com/profile-pictures/" + profileData.user.profilePicture.name
        }
        
        const payload = {
                profilePicture: profile,
                phone: profileData.user.phone,
                donorInfo:{
                    location: profileData.user.donorInfo.location,
                    age: profileData.user.donorInfo.age,
                    bio: profileData.user.donorInfo.bio
                }
        }   
        updateProfile(payload)
        
    }

    async function updateProfile(data){        
        try {
            await api.patch('/profile/update', data);   
            setSuccess("Profile updated")         
        } catch (err) {
            console.log(err)
            setError("Something went wrong, please try again.")
        }
        setLoading(false)
        setIsSame(true)
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
                <EditPageVisual EN = {EN} data={profileData} handleChange={handleChange} OnSave={OnSave} error={error} success={success} loading={loading} isSame={isSame} setIsSame={setIsSame}/>
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