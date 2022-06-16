import React from 'react';
import LanguageService from '../../../services/language';
import ProfileOutline from './ProfileOutline';

import "./Profile.scss"
import TokenService from '../../../services/token';
import api from "../../../services/api";
import Author from '../../author';

function Profile() {

    const [EN, setEN] = React.useState(false);
    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [validatedUser, setValidatedUser] = React.useState(false);

    React.useEffect(() => {
        function startup(){
            setEN(LanguageService.getLanguage()==='en')
            verifyUser()
            getUser()
        }
        startup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function verifyUser(){
       if(!TokenService.getLocalAccessToken()){
           timedOut()
       }else{
           setValidatedUser(true)
       }
    }

    async function getUser() {
        try {
            const res = await api.get('/profile');
            const newdata = {
                "user":{
                "donorInfo": {
                    "location": "World",
                    "age": "99",
                    "bio": "Hi.",
                    "preference": "email"
                },
                "zelleInfo": {
                    "email": "sdfdsgf",
                    "name": "",
                    "isAccepting": false
                },
                "role": "user",
                "email": "jangbel99@gmail.com",
                "firstName": "Jang",
                "lastName": "Belche",
                "phone": "123",
                "address": "UK",
                "IDNumber": "123456",
                "airTMNum": "fsdv@sdc.com",
                "reserveUsername": ""
            }
        }
            setData(res.data.data)
            setData(newdata)
        } catch (errors) {
            timedOut()
        } finally {
            setLoading(false)
        }
    }

    function timedOut(){
        TokenService.removeAccessToken()
        TokenService.removeRefreshToken()
        localStorage.removeItem("email")
        localStorage.removeItem("name")
        window.location.href="/login"
    }
    if(validatedUser){
        return (
            <div>
                <ProfileOutline
                    EN={EN}
                    data={data}
                    loading={loading}
                    type={TokenService.identifyUserType(data?.user?.role)}
                />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Author />
            </div>
        );
    }else{
        return(
            <div>
                ...
            </div>
        )
    }

}

export default Profile;