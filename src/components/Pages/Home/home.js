import React, { Component } from 'react';
import  { Grid } from '@material-ui/core';
import Author from '../../author';
import logo from '../../../pics/logo.png';
import './home.css';
import texts from './texts.json';
import airTMlogo from '../../../pics/airtmlogo.png';
import nutriendologo from '../../../pics/nutriendologo.jpg';
import rotaracatlogo from '../../../pics/rotaracat.jpg';
import banner1 from '../../../pics/banner1.png';
import banner2 from '../../../pics/banner2.png';
import banner3 from '../../../pics/banner3.png';
import banner4 from '../../../pics/banner4.png';

class Home extends Component{
    
    render(){
        return(
            <div className="home">
            <div className='home-page'>   


            <Grid container spacing={0} >
                <Grid item xs={12} sm={8}>    
                    <div id='description-home'>
                        <b style={{color:'#d62828'}}>Yakera</b>{texts["description"]["eng"]}
                    </div>
                </Grid>
                <Grid item xs={12} sm={3}>    
                    <div id='description-logo'>
                        <img src={logo} width='100%' alt='logo' />
                    </div>
                </Grid>
            </Grid>

                <div id='follow-us'>
                    <div className='links'>
                        <span>
                            <i className="fab fa-twitter-square  fa-2x"></i>
                            <a href='https://twitter.com/Yakera_ve'  rel="noopener noreferrer" target="_blank">@Yakera_ve</a>
                        </span>
                        
                        <span>
                            <i className="fab fa-instagram  fa-2x"></i>
                            <a href='https://www.instagram.com/yakera_ve/'  rel="noopener noreferrer" target="_blank">yakera_ve</a>
                        </span>
                        
                        <span>
                            <i className="fab fa-medium  fa-2x"></i>
                            <a href='https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767'  rel="noopener noreferrer" target="_blank">Read about us</a>
                        </span>
                    </div>
                </div>
            </div>
           


           <div id='construction-content'>
                    <div className='banner-home-alt'>
                        <img src={banner1} width='100%' alt='banner1' />
                    </div>
                    <div className='banner-home'>
                        <img src={banner2} width='100%' alt='banner1' />
                    </div>
                    <div className='banner-home'>
                        <img src={banner3} width='100%' alt='banner1' />
                    </div>
                    <div className='banner-home'>
                        <img src={banner4} width='100%' alt='banner1' />
                    </div>
           </div>
                

           <div id='construction-partners'>
                <h1>Our Partners:</h1><br /><br />
                <div id='partners'>                    
                    <img src={rotaracatlogo} width='150px' alt='Rotaracat logo' />
                    <img src={nutriendologo} width='150px' alt='nutriendo logo' />
                    <img src={airTMlogo} width='150px' alt='Airtm logo' />
                </div>
            </div>  


           <Author />
       

       </div>//end home
       
        )
    }
}

export default Home;