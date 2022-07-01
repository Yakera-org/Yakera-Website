import React from 'react';
import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios'
import login from './Pages/Login/Login';
import register from './Pages/Register/RegisterPage';
import ForgotPassword from './Pages/ForgotPassword/ForgotPasswordPage';
import ResetPassword from './Pages/ResetPassword/ResetPasswordPage';
import home from './Pages/Home/home';
import Campaign from './Pages/CampaignPage/CampaignPage';
import Terms from './Pages/Terms/terms';
import Consent from './Pages/Privacy/consent';
import FAQ from './Pages/FAQ/FAQPage';
import Campaigns from './Pages/Campaigns/Campaigns';
import AboutUs from './Pages/AboutUs/AboutUs';
import NotFoundPage from './Pages/404/NotFoundPage';
import CreateCampaign from './Pages/CreateCampaignPage/CreateCampaign';
import Dashboard from './Pages/Dashboard/Dashboard';
import EmailVerification from './Pages/EmailVerification/EmailVerificationPage';
import LanguageService from '../services/language';
import ProfileEditPage from './Pages/Profile/EditPage/EditPage';
import Profile from './Pages/Profile/Profile';
import SwitchAccountPage from './Pages/Profile/SwitchAccount/SwitchAccountPage';


function Main() {

    let isAuthenticated = true;

    React.useEffect(() => {
        //passing getData method to the lifecycle method
        getData()

    }, [])

    const [loaded, setLoaded] = React.useState(false);


    //creating function to load ip address from the API
    const getData = async () => {
        try {
            const res = await axios.get('https://geolocation-db.com/json/')
            if (res.data.country_name === 'Venezuela' || res.data.country_name === 'Spain') {
                LanguageService.setLanguageFromIP('es')
            } else {
                LanguageService.setLanguageFromIP('en')
            }
        } catch (e) {
            LanguageService.setLanguageFromIP('en')
        }
        finally{
            setLoaded(true)
        }
    }
    if (!loaded) {
        return (<p>Loading...</p>)
    } else {
        return (
            <BrowserRouter>
                <div style={{ marginTop: '100px' }}>
                    <Switch>
                        <Route exact path="/login" component={login} />
                        <Route exact path="/register" component={register} />
                        <Route exact path="/forgot-password" component={ForgotPassword} />
                        <Route exact path="/reset-password" component={ResetPassword} />                        
                        <Route exact path="/profile" component={Profile} />                        
                        <Route exact path="/campaigns" component={Campaigns} />
                        <Route exact path="/create-campaign" component={CreateCampaign} />
                        <Route exact path="/about" component={AboutUs} />
                        <Route exact path="/campaign/:title" component={Campaign} />
                        <Route exact path="/terms" component={Terms} />
                        <Route exact path="/consent" component={Consent} />
                        <Route exact path="/frequently-asked-questions" component={FAQ} />
                        <Route exact path="/dashboard" component={isAuthenticated ? Dashboard : login} />
                        <Route exact path="/profile/edit" component={ProfileEditPage} />
                        <Route exact path='/profile/switch' component={SwitchAccountPage} />
                        <Route exact path="/verify-email" component={EmailVerification} />
                        <Route exact path="/" component={home} />
                        <Route path="/404" component={NotFoundPage} />
                        <Redirect to="/404" />

                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default Main;


