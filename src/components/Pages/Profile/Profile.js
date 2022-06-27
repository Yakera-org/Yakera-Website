import React from 'react';
import LanguageService from '../../../services/language';
import ProfileOutline from './ProfileOutline';

import "./Profile.scss"
import TokenService from '../../../services/token';
import Author from '../../author';
import {userServices} from './UserService';
import OverlayAlert from './Dashboard/OverlayAlert';

function Profile() {

    const [EN, setEN] = React.useState(false);
    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [validatedUser, setValidatedUser] = React.useState(false);
    const [openOverlayAlert, setOpenOverlayAlert] = React.useState(false);

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

    async function onWithdraw(event, type){
        setOpenOverlayAlert(true)
        window.scrollTo({ top: 0, behavior: 'smooth' }); //scroll to top
        window.onscroll = function () { window.scrollTo(0, 0); };
        setData({
            ...data,
            slugToBeWithdrawn: event.target.name,
            typeOfWithdraw: type
        })
        
    }

   
    if(validatedUser){
        return (
            <div>
                {openOverlayAlert?<OverlayAlert EN={EN} data={data} onClose={setOpenOverlayAlert}/> :""}
                <ProfileOutline
                    EN={EN}
                    data={data}
                    loading={loading}
                    type={TokenService.identifyUserType(data?.user?.role)}
                    onWithdraw={onWithdraw}
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