import React,{useState} from 'react';
import Author from '../../author';
import DonorHubVisual from './DonorHubVisual';

import api from "../../../services/api";
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';

import './DonorHub.css';

function DonorHub() {

  const [loaded, setLoaded] = useState(false);
  const [EN, setEN] = useState(false);
  const [error, setError] = useState('');
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
          localStorage.setItem('email', res.data.data.user.email);
          localStorage.setItem('name', res.data.data.user.firstName + " " + res.data.data.user.lastName );
          setLoaded(true);
      } catch (err) {
          setError('Profile not found');
          setLoaded(true);
          TokenService.removeAccessToken()
          TokenService.removeRefreshToken()
          localStorage.removeItem("email")
          localStorage.removeItem("name")
          window.location.replace('/login')
      }
  }



    if (!loaded){
        return(
            <p style={{marginTop:'150px'}}>
                Loading ...
            </p>
        )
    }else if (error){
        return(
            <p style={{marginTop:'150px'}}>
                {error}
            </p>
        )
    }else{
        return (
          <div className='donorhub-page'>
            <DonorHubVisual EN = {EN} data={profileData}/>
            <Author />
          </div>
        )
    }


}

export default DonorHub;
