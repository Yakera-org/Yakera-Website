import React from 'react';
import {Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
// import login from './Pages/Login/login';
// import register from './Pages/Register/register'; 
import home from './Pages/Home/home';
import Campaign from './Pages/CampaignPage/CampaignPage';
// import profile from './Pages/Profile/profile';
import Terms from './Pages/Terms/terms';
import Consent from './Pages/Privacy/consent';
import FAQ from './Pages/FAQ/FAQ';
import donate from './Pages/Donate/donate';
import AboutUs from './Pages/AboutUs/aboutus';
import donateYakera from './Pages/DonateYakera/DonateYakera';
import NotFoundPage from './Pages/404/NotFoundPage';
import Confirmation from './Pages/Confirmation/Confirmation';




const Main = () => (
    
    <BrowserRouter>
        <div style={{marginTop: '100px'}}>
        <Switch>
            {/* <Route exact path="/login" component={login}/>
            <Route exact path="/register" component={register}/>
            <Route exact path="/profile" component={profile}/> */}
            <Route exact path="/donate" component={donateYakera}/>
            <Route exact path="/campaigns" component={donate}/>
            {/* <Route exact path="/confirmed" component={confirmed}/>         
            <Route exact path="/cancelled" component={cancelled}/>        */}
            <Route exact path="/info" component={AboutUs}/>
            <Route exact path="/campaign/:title" component={Campaign}/>
            <Route exact path="/terms" component={Terms}/>
            <Route exact path="/consent" component={Consent}/>
            <Route exact path="/faq" component={FAQ}/>
            <Route exact path="/confirm" component={Confirmation}/>
            <Route exact path="/" component={home}/>
            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />

        </Switch>
        </div>
    </BrowserRouter>
)

export default Main;