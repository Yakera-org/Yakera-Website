import React, { Component } from 'react';
import logo from '../../../pics/logo.png';
import wallpaper from '../../../pics/wallpaper.png';
import './construction.css';

class ConstructionPage extends Component{
   
    render(){
        return(
           <div className='construction-page'>
               s
               <div className='construction-text'>
                    <p>
                    ... YAKERA and its team are working on this website.
                   </p>
                   <p style={{paddingLeft:'200px'}}>
                   Come back soon to see ...
                   </p>
               </div>
               <div className='construction-img'>
                    <img src={logo} alt='logo' width='100%' />
               </div>
           </div>
        )
    }
}

export default ConstructionPage;