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
                <Route exact path="/login" component={login}/>
                <Route exact path="/register" component={register}/>
                {/* <Route exact path="/profile" component={profile}/> */}
                <Route exact path="/support" component={SupportUs}/>
                <Route exact path="/campaigns" component={donate}/>
                {/* <Route exact path="/confirmed" component={confirmed}/> */}
                {/* <Route exact path="/cancelled" component={cancelled}/> */}
                <Route exact path="/create-campaign" component={CreateCampaign} EN={EN} />
                <Route exact path="/about" component={AboutUs}/>
                <Route exact path="/campaign/:title" component={Campaign}/>
                <Route exact path="/terms" component={Terms}/>
                <Route exact path="/consent" component={Consent}/>
                <Route exact path="/frequently-asked-questions" component={FAQ}/>
                <Route exact path="/dashboard" component={isAuthenticated ? Dashboard : login}/>
                <Route exact path="/" component={home}/>
                <Route path="/404" component={NotFoundPage} />
                <Redirect to="/404" />

            </Switch>
            </div>
        </BrowserRouter>
    )
}

export default Main;


