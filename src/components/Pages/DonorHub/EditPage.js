import React, {useState} from 'react';
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';
import Author from '../../author';
import "./EditPage.css"
import EditPageVisual from './EditPageVisual';
import api from "../../../services/api";

function EditPage(props) {

    const [loaded, setLoaded] = useState(false);
    const [EN, setEN] = useState(false);
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

            setLoaded(true)
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
                <EditPageVisual EN = {EN} data={profileData}/>
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