import React, { Component } from 'react';
import logo from '../../../pics/logo.png';
import './construction.css';
import texts from './texts.json';
import { Button, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';


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
                    <div id='intro-text'>
                            {texts["intro-text"][this.state.language]}
                    </div>
                    <div className='langSwitch'>
                        <MuiThemeProvider theme={theme}>
                            <Button style={{marginRight:'2px', marginBottom:'2px'}} size="large" variant="outlined" color={this.state.color1} onClick={(event) => this.switchLang(event)}>ENG</Button>
                            <Button style={{marginRight:'2px'}} size="large" variant="outlined" color={this.state.color2} onClick={(event) => this.switchLang(event)}>ESP</Button>
                        </MuiThemeProvider>
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
                AirTm<br /><br />
                Nutriendo el Futuro<br /><br />
                Rotaract Caracas

               </div>

               
           </div>
           
        )
    }
}

export default ConstructionPage;