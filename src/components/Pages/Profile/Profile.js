import React from 'react';
import LanguageService from '../../../services/language';
import ProfileOutline from './ProfileOutline';

import "./Profile.scss"
import TokenService from '../../../services/token';
import Author from '../../author';
import {userServices} from './UserService';

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
            userServices.timedOut()
       }else{
           setValidatedUser(true)
       }
    }

    async function getUser() {
        try {
            const user = await userServices.getUserData()
            setData(user)
        } catch (errors) {
            userServices.timedOut()
        } finally {
            setLoading(false)
        }
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