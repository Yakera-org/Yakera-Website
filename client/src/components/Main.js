import React from 'react';
import {BrowserRouter, Switch, Route } from "react-router-dom";
import login from './login';
import home from './home';
import donate from './donate';
import confirmed from './confirmed';
import cancelled from './cancelled';




const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={login}/>
            <Route exact path="/" component={home}/>
            <Route exact path="/donate" component={donate}/>
            <Route exact path="/confirmed" component={confirmed}/>         
            <Route exact path="/cancelled" component={cancelled}/>        

        </Switch>
    </BrowserRouter>
)

export default Main;