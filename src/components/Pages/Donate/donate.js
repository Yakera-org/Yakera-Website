import React, { Component } from 'react';
import CampaignCard from '../../campaignCard';
import Author from '../../author';
import  { Grid } from '@material-ui/core';

import campaigns from './allCampaigns';
import pics from './pics';
import './donate.css';


const headerDic = {
    "en":{
        "education":"Education",
        "healthcare":"Healthcare",
        "nutrition":"Nutrition",
        "business":"Small Business",
    },
    "sp":{
        "education":"Educación",
        "healthcare":"Atención Médica",
        "nutrition":"Nutrición",
        "business":"Pequeños Negocios",
    }

}

const colorDic={
    "education": '#004aad',
    "healthcare": '#da3b18',
    "business":'#ff6c11',
    "nutrition": '#915700',
  }

class donate extends Component{
    constructor(props) {
        super(props);
        this.state = {
                value: 0,
                loaded: false,
                language: 'en',
                tab:'education'
            }
        this.imgClick = this.imgClick.bind(this);
    }

    componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        this.setState({
            language: lang,
            loaded:true
        })
    }
    
    handle_change = (value) => {
        this.setState({ value })
    }

    imgClick(event){
        this.setState({
            tab: event.target.id
        })
    }
    
   
    render(){
        var count = 0;

        if(!this.state.loaded){
            return(
                <p>Loading</p>
            )
        }else{
            var selectedColor = colorDic[this.state.tab];
            var education = 'none';
            var healthcare = 'none';
            var business = 'none';
            var nutrition = 'none';

            switch(this.state.tab){
                case "education":
                    education = 'solid';
                    break;
                case "healthcare":
                    healthcare = 'solid';
                    break;
                case "business":
                    business = 'solid';
                    break;
                case "nutrition":
                    nutrition = 'solid';
                    break;
                default:
                    break;  
            }

            return(
                <div className="donate-page">
                    <div className="img-tabs">
                        <img src={pics[this.state.language].education} id="education" alt="tab-1" onClick={this.imgClick}
                        style={{ borderStyle:education, borderColor:selectedColor}}
                        />
                        <img src={pics[this.state.language].healthcare} id="healthcare" alt="tab-2" onClick={this.imgClick}
                        style={{ borderStyle:healthcare, borderColor:selectedColor}}
                        />
                        <img src={pics[this.state.language].business} id="business" alt="tab-3" onClick={this.imgClick}
                        style={{ borderStyle:business, borderColor:selectedColor}}
                        />
                        <img src={pics[this.state.language].nutrition} id="nutrition" alt="tab-4" onClick={this.imgClick}
                        style={{ borderStyle:nutrition, borderColor:selectedColor}}/>

                    </div>
    
                <hr style={{margin:'50px 0'}}/>

                <div className="header-top">
                    <h1 style={{color: selectedColor}}>
                        {headerDic[this.state.language][this.state.tab]}
                    </h1>
                    <p>
                        {this.state.language === 'en' ? 'Check out the campaigns below' : 'Mira las campañas a continuación'}
                    </p>
                </div>
    
                <hr style={{margin:'50px 0'}}/>

                 <Grid container spacing={5} style={{alignContent:'center', alignItems:'center'}}>
                    {campaigns.map((cam, i) => {
                     
                        if(cam.cam.category === this.state.tab){
                            count++;
                            return(
                                <Grid item xs={12} sm={3} key={i}>
                                    <CampaignCard
                                        campaign={cam.cam}
                                        color={selectedColor}
                                        language={this.state.language}
                                    />
                                </Grid>
                            )
                        }

                        return(<div key={i+""+cam.cam.name}></div>)
                    })}    

                </Grid>
    
                <div style={{textAlign:'center'}}>
                    <p id='no-cam'>
                        {count===0 ?  this.state.language === 'en' ? 'No campaigns in this category' : 'No hay campañas en esta categoría.' : ''}
                    </p>
                </div>

                <div style={{marginTop:'16%'}}>
                    <Author />
                </div>
    
                </div>
            )
        }
    }
}

export default donate;
