import React, { Component } from 'react';
import logo from '../pics/logo.png';
import wallpaper from '../pics/wallpaper.png';

class home extends Component{
    render(){
        return(
            <div className="homePage">  
                <img style={{width:'100%'}} src={wallpaper} alt="img" />               
            </div>
        )
    }
}

export default home;