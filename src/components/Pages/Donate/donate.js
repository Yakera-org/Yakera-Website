import React, { Component } from 'react';
import CampaignCard from './campaignCard';
import Author from '../../author';
import  { Grid } from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";
import campaigns from './allCampaigns';
import pics from './pics';
import icons from './icons';
import SearchIcon from '@material-ui/icons/Search';
import { Form, InputGroup } from 'react-bootstrap';

import './donate.css';

const _axios = require('axios');
const axios = _axios.create();
const yakeraBackUrl = 'https://api.yakera.net';

const colorDic={
    "education": '#71b98f',
    "healthcare": '#ff7d7d',
    "business":'#7099d0',
    "nutrition": '#ffc19a',
};

// no way did i write this, so here is an explanation
// 
const arrayUnique = (array) => {
    var a = array.concat();
    for (var i=0; i<a.length; i++) {
        for (var j=i+1; j<a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

const filterCampaignsBySearch = (campaigns, query, lang) => {
    if(!query) {
      return campaigns;
    }
  
    const searchTitles = campaigns.filter((campaign) => {
        const campaignTitle = campaign.cam.title[lang].toLowerCase();
        return campaignTitle.includes(query);
    });
    const searchDescriptions = campaigns.filter((campaign) => {
        const campaignDescription = campaign.cam.description[lang].toLowerCase();
        return campaignDescription.includes(query);
    });

    return arrayUnique(searchTitles.concat(searchDescriptions));
};

const filterCampaignsByCategory = (campaigns, categoryState) => {
    let activeFilter = categoryState.replace('Filter', '');

    return campaigns.filter((campaign) => {
        const campaignCategory = campaign.cam.category;
        return campaignCategory.includes(activeFilter);
    })
};

class SearchBar extends React.Component {
    render () {
        return (
            <InputGroup
                style={{
                    border: '1px solid #ced4da',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    width: '40%',
                    display: 'inline-flex',
                    marginTop: '10px'
                }}
            >
                <InputGroup.Text
                    style={{
                        border: 'none',
                        backgroundColor: 'white',
                    }}
                >
                    <SearchIcon />
                </InputGroup.Text>
                <Form.Control
                    type='search'
                    placeholder='Search...'
                    value={this.props.searchQuery}
                    onChange={e => this.props.setSearchQuery(e.target.value)}
                    style={{
                        border: 'none',
                        backgroundColor: 'white',
                    }}
                />
            </InputGroup>
        )
    }
};

class donate extends Component{
    constructor(props) {
        super(props);
        this.state = {
                value: 0,
                loaded: false,
                language: 'en',
                tab:'education',
                dicAmount:{},
                searchQuery:'',
                healthcareFilter: '',
                educationFilter: '',
                businessFilter: '',
                nutritionFilter: '',
                activeCategory: '',
            }
    }

    async componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        var dicStorage = JSON.parse(localStorage.getItem("dic"));
        if(!dicStorage){
            var dic = {}
            for(let i in campaigns){
                let name = campaigns[i].cam.name;
                await this.getCurrentAmount(name).then((res) => {
                    dic[name] = res
                })
            }
    
            localStorage.setItem("dic", JSON.stringify(dic));
            this.setState({
                dicAmount: dic,
            })
        }else{
            this.setState({
                dicAmount: dicStorage,
            })
        }

        this.setState({
            language: lang,
            loaded:true
        })
    }
    
    handle_change = (value) => {
        this.setState({ value })
    }    

    async getCurrentAmount(name){

        var result = 0;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = yakeraBackUrl + "/api/campaign/?email=" + name;
        
        await axios.get(url, config)
        .then(res => {
                result =  res.data[0].amount
        })
        .catch(err => {
            console.log("error: " + err.message);
        })
    
        return result;   
    }

    setSearchQuery = (e) => {
        this.setState({
            healthcareFilter: '',
            educationFilter: '',
            businessFilter: '',
            nutritionFilter: '',
        });

        this.setState({searchQuery : e});
    }

    handleFilter = (categoryState) => {
        this.setState({searchQuery : ''});

        if (this.state[categoryState] === 'active') {
            this.setState({
                healthcareFilter: '',
                educationFilter: '',
                businessFilter: '',
                nutritionFilter: '',
            });
        } else {
            this.setState({
                healthcareFilter: 'fade',
                educationFilter: 'fade',
                businessFilter: 'fade',
                nutritionFilter: 'fade',
            });
    
            this.setState({[categoryState]: 'active'});
            this.setState({activeCategory: categoryState});
        }
    }

    handleFilteredCampaigns = () => {
        if (this.state.searchQuery.length !== 0) {
            return filterCampaignsBySearch(campaigns, this.state.searchQuery, this.state.language);
        } else if (this.state.healthcareFilter.length !== 0) {
            return filterCampaignsByCategory(campaigns, this.state.activeCategory);
        }
        return campaigns;
    };
   
    render(){
        var count = 0;
        var filteredCampaigns = this.handleFilteredCampaigns();

        if(!this.state.loaded){
            return(
                <div className="donate-page-loading">
                     <div className="sweet-loading loader">
                            <HashLoader
                                size={150}
                                color={"#01224d"}
                                loading={this.state.loading}
                            />
                        </div>                
                    <div id="overlay"></div>

                    <div className="header-top">
                        <h1>
                            Loading
                        </h1>
                    </div>
        
                        <hr id="hr-top"/>
                    </div>
            )
        }else{

            return(
                <div className="donate-page">
                <div className="header-top">
                    <h1>
                        {this.state.language === 'en' ? 'CAMPAIGNS' : 'CAMPAÑAS'}
                    </h1>
                    {/* <p>
                        {this.state.language === 'en' ? 'Browse campaigns and chip in. Now, more than ever, Venezuelans need your help in education, healthcare, nutrition, and small business. Yakera helps Venezuelans transition from survival to resilience.' : 'Explora campañas y dona directamente. Ahora más que nunca, los venezolanos necesitan tu ayuda en educación, salud, nutrición y pequeños negocios. Yakera asiste a los venezolanos a pasar de supervivencia a resiliencia.'}
                    </p> */}
                    <div className='campaign-filter'>
                        <img 
                            src={pics.healthcare}
                            width='10%' height='10%'
                            className={this.state.healthcareFilter}
                            onClick={() => {
                                this.handleFilter('healthcareFilter');
                            }} 
                        />
                        <img
                            src={pics.education}
                            width='10%' height='10%'
                            className={this.state.educationFilter}
                            onClick={() => {
                                this.handleFilter('educationFilter');
                            }} 
                        />
                        <img 
                            src={pics.business}
                            width='10%' height='10%'
                            className={this.state.businessFilter}
                            onClick={() => {
                                this.handleFilter('businessFilter');
                            }} 
                        />
                        <img
                            src={pics.nutrition}
                            width='10%' height='10%'
                            className={this.state.nutritionFilter}
                            onClick={() => {
                                this.handleFilter('nutritionFilter');
                            }} 
                        />
                    </div>
                    <SearchBar 
                        searchQuery={this.state.searchQuery}
                        setSearchQuery={this.setSearchQuery}
                    />
                </div>

    
                <hr id="hr-top"/>

                 <Grid container spacing={5} style={{alignContent:'center', alignItems:'flex-start'}}>
                    {filteredCampaigns.sort(() => 0.5 - Math.random()).map((cam, i) => {
                            count++;
                            return(
                                <Grid item xs={12} sm={3} key={i}>
                                    <CampaignCard
                                        campaign={cam.cam}
                                        color={colorDic[cam.cam.category]}
                                        language={this.state.language}
                                        logo={pics[cam.cam.category]}  // make this pass the whole thing
                                        amount={this.state.dicAmount[cam.cam.name]}
                                        icon={icons[cam.cam.category]}
                                    />
                                </Grid>
                            )                       
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
