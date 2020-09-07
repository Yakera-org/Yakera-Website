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
        main: '#f44336',
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
                <MuiThemeProvider theme={theme}>
                    <Button variant="outlined" color={this.state.color1} onClick={(event) => this.switchLang(event)}>ENG</Button>
                    <Button variant="outlined" color={this.state.color2} onClick={(event) => this.switchLang(event)}>SPA</Button>
                </MuiThemeProvider>

                
               
               <div id='intro-text'>
                    {texts["intro-text"][this.state.language]}
               </div>

               <hr style={{margin:'100px 100px 10px 100px'}}/>

               <div id='description'>
                    {texts["description"][this.state.language]}
               </div>
               
               <div id='construction-logo'>
                   <img src={logo} width='100%' alt='logo' />
               </div>

               <hr style={{clear:'both', margin:'50px 100px'}}/>

               <div id='construction-content'>
                    {texts["construction-numbers"][this.state.language]}
                    {texts["construction-path"][this.state.language]}
               </div>

               <hr style={{margin:'50px 100px'}}/>

               <div id='construction-partners'>
               Our partners:<br /><br />
                AirTm<br /><br />
                Nutriendo el Futuro<br /><br />
                Rotaract Caracas

               </div>

               
           </div>
           
        )
    }
}

export default ConstructionPage;