import React from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import login from './Pages/Login/login';
import register from './Pages/Register/register';
import home from './Pages/Home/home';
import landing from './Pages/Landing/landing';
import profile from './Pages/Profile/profile';
import donate from './Pages/Donate/donate';
import confirmed from './confirmed';
import cancelled from './cancelled';




const Main = () => (
    <BrowserRouter>
        <Switch>
            <div style={{marginTop: '100px'}}>
            <Route exact path="/login" component={login}/>
            <Route exact path="/register" component={register}/>
            <Route exact path="/profile" component={profile}/>
            <Route exact path="/donate" component={donate}/>
            <Route exact path="/confirmed" component={confirmed}/>         
            <Route exact path="/cancelled" component={cancelled}/>       
            <Route exact path="/info" component={home}/>
            <Route exact path="/" component={home}/>
            </div>

        </Switch>
    </BrowserRouter>
)

export default Main;