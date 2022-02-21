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
          console.log(res)
          setProfileData(res.data.data);
          const lol = {
            "user": {
                "donorInfo": {
                    "location": "London",
                    "age": "22",
                    "bio": "Hi, I am Jango. CS student, yaya"
                },
                "role": "donor",
                "firstName": "Jango Donor",
                "lastName": "dooonor",
                "email": "jang.belche@student.manchester.ac.uk",
                "phone": "123",
                "profilePicture": "https://yakera-files.s3.us-east-2.amazonaws.com/profile-pictures/comet-min.png"
            },
            "donations": [
                {
                    "_id": "618da2d92f3ad1cd5750a5d2",
                    "donationId": "620e4355f6afc8d78e491e49",
                    "email": "jang.belche@student.manchester.ac.uk",
                    "amount": 5,
                    "tip": 0,
                    "paymentMethod": "paypal",
                    "comment": "Vamos José",
                    "title": "Alimentación",
                    "slug": "alimentacion",
                    "category": "education",
                    "createdAt": "2022-02-17T12:45:09.495Z"
                }, {
                    "_id": "618da2d92f3ad1cd5750a5d2",
                    "donationId": "620e4355f6afc8d78e491e49",
                    "email": "jang.belche@student.manchester.ac.uk",
                    "amount": 5,
                    "tip": 0,
                    "paymentMethod": "paypal",
                    "comment": "Vamos José",
                    "title": "Alimentación",
                    "slug": "alimentacion",
                    "category": "nutrition",
                    "createdAt": "2022-02-17T12:45:09.495Z"
                }, {
                    "_id": "618da2d92f3ad1cd5750a5d2",
                    "donationId": "620e4355f6afc8d78e491e49",
                    "email": "jang.belche@student.manchester.ac.uk",
                    "amount": 5,
                    "tip": 0,
                    "paymentMethod": "paypal",
                    "comment": "Vamos José",
                    "title": "Alimentación",
                    "slug": "alimentacion",
                    "category": "nutrition",
                    "createdAt": "2022-02-17T12:45:09.495Z"
                }, {
                    "_id": "618da2d92f3ad1cd5750a5d2",
                    "donationId": "620e4355f6afc8d78e491e49",
                    "email": "jang.belche@student.manchester.ac.uk",
                    "amount": 5,
                    "tip": 0,
                    "paymentMethod": "paypal",
                    "comment": "Vamos José",
                    "title": "Alimentación",
                    "slug": "alimentacion",
                    "category": "nutrition",
                    "createdAt": "2022-02-17T12:45:09.495Z"
                }, {
                    "_id": "618da2d92f3ad1cd5750a5d2",
                    "donationId": "620e4355f6afc8d78e491e49",
                    "email": "jang.belche@student.manchester.ac.uk",
                    "amount": 5,
                    "tip": 0,
                    "paymentMethod": "paypal",
                    "comment": "Vamos José",
                    "title": "Alimentación",
                    "slug": "alimentacion",
                    "category": "education",
                    "createdAt": "2022-02-17T12:45:09.495Z"
                }
            ]
        }
        setProfileData(lol);
          setLoaded(true);
      } catch (err) {
          setError('Profile not found');
          setLoaded(true);
          TokenService.removeAccessToken()
          TokenService.removeRefreshToken()
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
