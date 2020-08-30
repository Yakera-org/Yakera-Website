import React, { Component } from 'react';
import wallpaper from '../../../pics/wallpaper.png';

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