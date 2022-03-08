import React, {useState} from 'react';
import DashboardVisuals from './DashboardVisuals';
import { validateFields } from '../Register/Validation';

import './Dashboard.css';
import api from "../../../services/api";
import LanguageService from '../../../services/language';
import TokenService from '../../../services/token';

function Dashboard() {

    const [loaded, setLoaded] = useState(false);
    const [EN, setEN] = useState(false);
    const [airTMemail, setAirTMEmail] = useState('');
    const [airTMEmailError, setAirTMEmailError] = useState('');
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState({});

    const [zelleEmail, setZelleEmail] = useState('');
    const [zelleEmailError, setZelleEmailError] = useState('');
    const [zelleName, setZelleName] = useState('');
    const [zelleNameError, setZelleNameError] = useState('');
    const [zelleCheckbox, setZelleCheckbox] = useState(false);

    React.useEffect(() => {
        function startup(){
            if(LanguageService.getLanguage()==='en'){
                setEN(true)
            }
            else {
                setEN(false)
            }
            if (TokenService.getLocalAccessToken()) {
                if(TokenService.isRecipient()){
                    // only allow recipients to this page
                    getCampaign();
                }else{
                    // redirect donors to their page
                    window.location = '/donor-hub';
                }
                
            } else {
                window.location = '/';
            }
        }
        startup(); 
    }, []);
    
    async function getCampaign() {
        try {
            const res = await api.get('/profile');
            console.log(res.data.data)
            setProfileData(res.data.data);
            // setProfileData({
            //     "user": {
            //       "email": "test@test.com",
            //       "firstName": "John",
            //       "lastName": "Doe",
            //       "phone": "+584121234567",
            //       "address": "Caracas, Venezuela",
            //       "airTMNum": "123456789",
            //     //   'zelleInfo': {
            //     //         email: "test@test.com",
            //     //         name: "Test Name",
            //     //         bank: "Whatever bank",
            //     //         isAccepting: true
            //     //     },
            //     },
            //     "campaigns": [{
            //       "slug": "stengthening-education-in-el-calvario-venezuela",
            //       "targetAmount": 600,
            //       "country": "Venezuela",
            //       "_user": "610f0bc1a072af0598a3def2",
            //       "title": "Stengthening Education in El Calvario",
            //       "category": "small_business",
            //       "story": "Nutriendo El Futuro is an organization that generates positive changes and sustainable impact in El Calvario",
            //       "description": "Nutriendo El Futuro is an organization",
            //       "mainPicture": {
            //         "url": "https://assets.yakera.org/pictures/1635201650644-30sxdy.jpg"
            //       },
            //       "pictures": [],
            //       "supportDocs": [],
            //       "updates": [],
            //       "donations": [],
            //       "raised": 150,
            //       "percentage": 29.89546,
            //       "withdrawn": 150,
            //       "completed": false,
            //       "disabled": false,
            //       "approved": true,
            //       "createdAt": "2022-03-02",
            //       "updatedAt": "2022-03-02"
            //     },
            //     {
            //         "slug": "stengthening-education-in-el-calvario-venezuela",
            //         "targetAmount": 600,
            //         "country": "Venezuela",
            //         "_user": "610f0bc1a072af0598a3def2",
            //         "title": "Stengthening Education in El Calvario",
            //         "category": "small_business",
            //         "story": "Nutriendo El Futuro is an organization that generates positive changes and sustainable impact in El Calvario",
            //         "description": "Nutriendo El Futuro is an organization",
                    
            //         "pictures": [],
            //         "supportDocs": [],
            //         "updates": [],
            //         "donations": [],
            //         "raised": 150,
            //         "percentage": 29.89546,
            //         "withdrawn": 150,
            //         "completed": false,
            //         "disabled": false,
            //         "approved": false,
            //         "createdAt": "2022-03-02",
            //         "updatedAt": "2022-03-02"
            //       },
            //       {
            //         "slug": "stengthening-education-in-el-calvario-venezuela",
            //         "targetAmount": 600,
            //         "country": "Venezuela",
            //         "_user": "610f0bc1a072af0598a3def2",
            //         "title": "Stengthening Education in El Calvario",
            //         "category": "small_business",
            //         "story": "Nutriendo El Futuro is an organization that generates positive changes and sustainable impact in El Calvario",
            //         "description": "Nutriendo El Futuro is an organization",
            //         "mainPicture": {
            //           "url": "https://assets.yakera.org/pictures/1635201650644-30sxdy.jpg"
            //         },
            //         "pictures": [],
            //         "supportDocs": [],
            //         "updates": [],
            //         "donations": [],
            //         "raised": 150,
            //         "percentage": 29.89546,
            //         "withdrawn": 150,
            //         "completed": false,
            //         "disabled": false,
            //         "approved": false,
            //         "createdAt": "2022-03-02",
            //         "updatedAt": "2022-03-02"
            //       }]
            // })
            setLoaded(true);
        } catch (err) {
            setError('Profile not found');
            setLoaded(true);
            TokenService.removeAccessToken()
            TokenService.removeRefreshToken()
            window.location.replace('/login')
        }
    }

    async function onWithdraw(event){
        let slug = event.target.name;
        const res = await api.get(`/campaigns/${slug}`);
        const requestBody = {
            slug: slug,
            amount: res.data.data.raised,
            campaignAmountAtMoment: res.data.data.raised, // For future iterations
        }
        try {
            await api.post(`/campaigns/withdrawn`, requestBody);
            window.alert(EN ? 'Campaign successfully withdrawn!' : '¡Campaña retirada con éxito!')
            window.location.reload();
        } catch (err) {
            console.log('Error. ' + err)
        }
    }

    function handleChange(event){
        validate(event.target.value)
        setAirTMEmail(event.target.value)
    }
    function validate(email){
        var tempError;
        tempError = validateFields.validateEmail(email);
        setAirTMEmailError(tempError)
        if(!tempError){
            return true
        }
    }
    function onSubmitEmail(){
        if(validate(airTMemail)){
            backendPatch()
        }
    }

    const handleChangeZelleCheckbox = (e) => {
        setZelleCheckbox(e.target.checked);
    };
    const handleChangeZelleEmail = (e) => {
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
        if(validateZelleEmail(zelleEmail) && validateZelleName(zelleName)){
            console.log('Submit Zelle Email and Name');
            backendPatch();
        } else if(zelleCheckbox !== profileData.user.zelleInfo.isAccepting) {
            backendPatch();
        }
    };

    async function backendPatch(){
        try {
            const requestBody = {      
                airTMNum: airTMemail,
                zelleInfo: {
                    email: zelleEmail,
                    name: zelleName,
                    isAccepting: zelleCheckbox,
                },
            };
          
            await api.patch('/profile/update', requestBody);
            window.location.reload();   
        } catch (err) {
            console.log('Error. ' + err)
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
            <div className='dashboard-page'>
                <DashboardVisuals
                    EN={EN}
                    data={profileData}
                    onWithdraw={onWithdraw}
                    handleChange={handleChange}
                    airTMEmailError={airTMEmailError}
                    onSubmitEmail={onSubmitEmail}
                    handleChangeZelleCheckbox={handleChangeZelleCheckbox}
                    handleChangeZelleEmail={handleChangeZelleEmail}
                    handleChangeZelleName={handleChangeZelleName}
                    zelleEmailError={zelleEmailError}
                    zelleNameError={zelleNameError}
                    zelleCheckbox={zelleCheckbox}
                    onSubmitZelle={onSubmitZelle}
                />
            </div>
        )
    }
}

export default Dashboard    
