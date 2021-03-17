import React, { Component } from 'react';
import  { Grid } from '@material-ui/core';
import Author from '../../author';
import './home.css';
import texts from './texts.json';
import {en_pics, sp_pics} from './picsHome.js';

var pics = en_pics;


class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            language: 'en',
        }
        this.hanldeClick = this.hanldeClick.bind(this);
    }

    hanldeClick(){
        window.location='/campaigns';
    }

    componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(lang){
            this.setState({
                language: lang
            })
        }else{
            localStorage.setItem("lang", this.state.language);
        }

        if(lang === "en"){
            pics = en_pics;
        }else{
            pics = sp_pics;
        }

        this.setState({
            loaded: true
        })
    }
    
    render(){
        if(!this.state.loaded){
            return(
                <div>
                    Loading
                </div>
            )
        }else{
            return(
                <div className="home">
                <div className='home-page'>   


                <Grid container spacing={0} >
                    <button
                        type="submit"
                        className="btn btn-secondary btn-block mobile-only"  
                        onClick={this.hanldeClick}                                                   
                        >
                        {this.state.language === 'en' ? 'Donate Now' : 'Done ahora'}
                    </button>

                    <Grid item xs={12} sm={8}> 
    
                    
                        <div id='description-home'>
                            {texts["pre-des"][this.state.language]}
                        <br />
                        <br />
                            <b style={{color:'#d62828'}}>Yakera</b>{texts["description"][this.state.language]}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={3}>    
                        <div id='description-logo'>
                            <img src={pics.logo} width='100%' alt='logo' />
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
                                <a href='https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767'  rel="noopener noreferrer" target="_blank">
                                    {this.state.language==='en' ? 'Read about us' : 'Lee sobre nosotros'}
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            


            <div id='construction-content'>
                        <div className='banner-home-alt'>
                            <img src={pics.banner1} width='100%' alt='banner1' />
                        </div>
                        <div className='banner-home'>
                            <img src={pics.banner2} width='100%' alt='banner1' />
                        </div>
                        <div className='banner-home'>
                            <img src={pics.banner3} width='100%' alt='banner1' />
                        </div>
                        <div className='banner-home'>
                            <img src={pics.banner4} width='100%' alt='banner1' />
                        </div>
            </div>
                    

            <div id='categories'>
                    <div id='cat'>                    
                        <a href="/campaigns"><img src={pics.healthcare} width='25%' alt='healthcare' /></a>
                        <a href="/campaigns"><img src={pics.business} width='25%' alt='business' /></a>
                        <a href="/campaigns"><img src={pics.education} width='25%' alt='education' /></a>
                        <a href="/campaigns"><img src={pics.nutrition} width='25%' alt='nutrition' /></a>
                    </div>
                </div>  

                <hr style={{width:'80%', marginLeft:'10%' }}/>

                <div id='construction-partners'>
                    <h2>{this.state.language==='en' ? 'Our Partners' : 'Nuestros Compañeros'}</h2><br /><br />
                    <div id='partners'>                    
                        <img src={pics.rotaracatlogo} style={{width:'140px'}} alt='Rotaracat logo' />
                        <img src={pics.nutriendologo} style={{width:'140px'}} alt='nutriendo logo' />
                        <img src={pics.airTMlogo} style={{width:'140px'}} alt='Airtm logo' />
                    </div>
                </div>  


            <Author />
        

        </div>//end home
        
            )
        }      
    }
}

export default Home;