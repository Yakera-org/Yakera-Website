import React, { Component } from 'react';
import logo from '../../../pics/logo.png';
import './construction.css';
import texts from './texts.json';
import { Button, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import airTMlogo from '../../../pics/airtmlogo.png';
import nutriendologo from '../../../pics/nutriendologo.jpg';
import rotaracatlogo from '../../../pics/rotaracat.jpg';


const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#000",
      },
      secondary: {
        main: '#d62828',
      },
    },
  });

class ConstructionPage extends Component{
   constructor(props){
       super(props);
       this.state = {
            language: "eng",
            color1: "primary",
            color2: "secondary",
       }
   }
   switchLang(event){
       if(this.state.color1 === "primary"){
           this.setState({ 
               language:'spa',
               color1: "secondary",
               color2: "primary"
           });
           
       }else{
        this.setState({ 
            language:'eng',
            color1: "primary",
            color2: "secondary"
        });
       }
     }

    render(){
        return(
            <div className='construction-page'>
                <div className='intro'>
                    <div className='langSwitch'>
                        <MuiThemeProvider theme={theme}>
                            <Button style={{marginRight:'2px', marginBottom:'2px'}} size="large" variant="outlined" color={this.state.color1} onClick={(event) => this.switchLang(event)}>ENG</Button>
                            <Button style={{marginRight:'2px'}} size="large" variant="outlined" color={this.state.color2} onClick={(event) => this.switchLang(event)}>ESP</Button>
                        </MuiThemeProvider>
                    </div>                
                    <div id='intro-text'>
                            {texts["intro-text"][this.state.language]}
                    </div>

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


               <hr style={{margin:'80px 0px 50px 0px'}}/>

               <div id='description'>
                    <b style={{color:'#d62828'}}>Yakera</b>{texts["description"][this.state.language]}
               </div>
               
               <div id='construction-logo'>
                   <img src={logo} width='100%' alt='logo' />
               </div>

               <hr style={{clear:'both', margin:'50px 0px'}}/>

               <div id='construction-content'>
                    <h2>Venezuela by the  <b style={{color:'#d62828'}}>Numbers</b></h2>
                    <h1 style={{textAlign:'center'}}>79.3%</h1>
                    <p>The percentage of Venezuelans living in  <b style={{color:'#d62828'}}>extreme poverty</b> according to the 2020 Encuesta de Condiciones de Vida. 96.2% are considered poor or in poverty.</p>
                    <br />
                    <h1 style={{textAlign:'center'}}>5 million +</h1>
                    <p >People have  <b style={{color:'#d62828'}}>left the country</b> due to the economic catastrophe and the unstable political situation.</p>
                    <br />
                    <h1 style={{textAlign:'center'}}>24 Lbs.</h1>
                    <p>Average  <b style={{color:'#d62828'}}>weight lost</b> per capita since the beginning of the economic crisis.</p>
                    <br />
                    <h1 style={{textAlign:'center'}}>1</h1>
                    <p>The  <b style={{color:'#d62828'}}>number of crowdfunding platforms</b> capable of providing anonymous, non-inflated, direct cash transfers to Venezuelans in need. Spoiler alert, it’s us.</p>

                    <hr style={{margin:'50px 0px'}}/>
               </div>
               <div  id='construction-path'>
                    {texts["construction-path"][this.state.language]}
               </div>
                   

               <hr style={{margin:'50px 0px'}}/>

               <div id='construction-partners'>
                <b>Our partners:</b><br /><br />
                <div id='partners'>                    
                    <img src={rotaracatlogo} width='150px' style={{borderRadius:'20%', marginLeft:'20px', marginRight:'20px'}} alt='Airtm logo' />
                    <img src={nutriendologo} width='150px' style={{borderRadius:'10%', marginLeft:'20px', marginRight:'20px'}} alt='Airtm logo' />
                    <img src={airTMlogo} width='150px' style={{borderRadius:'20%', marginLeft:'20px', marginRight:'20px'}} alt='Airtm logo' />
                </div>

               </div>

               
           </div>
           
        )
    }
}

export default ConstructionPage;