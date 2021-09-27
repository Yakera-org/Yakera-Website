import React from 'react';
import {Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import login from './Pages/Login/LoginPage';
import register from './Pages/Register/RegisterPage'; 
import home from './Pages/Home/home';
import Campaign from './Pages/CampaignPage/CampaignPage';
// import profile from './Pages/Profile/profile';
import Terms from './Pages/Terms/terms';
import Consent from './Pages/Privacy/consent';
import FAQ from './Pages/FAQ/FAQPage';
import donate from './Pages/Donate/donate';
import AboutUs from './Pages/AboutUs/AboutUs';
import SupportUs from './Pages/SupportUs/SupportUs';
import NotFoundPage from './Pages/404/NotFoundPage';
import CreateCampaign from './Pages/CreateCampaignPage/CreateCampaign';
import Dashboard from './Pages/Dashboard/Dashboard';
import LanguageService from "../services/language";



function Main(){

    React.useEffect(() =>{
        setLanguage(LanguageService.getLanguage());
    }, [])

    const [language, setLanguage] = React.useState('');

    var EN;
    if(language === "en"){
        EN = true
    }else{
        EN = false
    }

    let isAuthenticated = true;

    return(
        <BrowserRouter>
            <div style={{marginTop: '100px'}}>
            <Switch>
                <Route exact path="/login" component={login}  EN={EN}/>
                <Route exact path="/register" component={register}  EN={EN}/>
                <Route exact path="/support" component={SupportUs}  EN={EN}/>
                <Route exact path="/campaigns" component={donate}  EN={EN}/>
                <Route exact path="/create-campaign" component={CreateCampaign} EN={EN} />
                <Route exact path="/about" component={AboutUs}  EN={EN}/>
                <Route exact path="/campaign/:title" component={Campaign}  EN={EN}/>
                <Route exact path="/terms" component={Terms}  EN={EN}/>
                <Route exact path="/consent" component={Consent}  EN={EN}/>
                <Route exact path="/frequently-asked-questions" component={FAQ}  EN={EN}/>
                <Route exact path="/dashboard" component={isAuthenticated ? Dashboard : login}  EN={EN}/>
                <Route exact path="/" component={home}  EN={EN}/>
                <Route path="/404" component={NotFoundPage}  EN={EN} />
                <Redirect to="/404" />

            </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Main;


