import React, {Component} from 'react';
import {AppBar, Toolbar, Typography } from '@material-ui/core';

import '../App.css';


class NavBar extends Component {
    render(){
        return(
            <div className='nav-bar'>
                <AppBar position="fixed" id='app-bar'>
                    <Toolbar>
                        <Typography  id='app-bar-text'>
                        YAKERA
                        </Typography>
                        <Typography  id='app-bar-statement'>
                        Yakera uplifts the voices of Venezuelan people to provide a safe, vetted, and decentralized pathway to aid motivated by solidarity and freedom to help Venezuelans transition from survival to resilience.
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default NavBar;