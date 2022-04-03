import React, { Component } from 'react';
import CampaignCard from './campaignCard';
import Author from '../../author';
import  { Grid } from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";
import pics from './pics';
import SearchIcon from '@material-ui/icons/Search';
import { Form, InputGroup } from 'react-bootstrap';

import './donate.css';
import api from '../../../services/api';
import LanguageService from '../../../services/language';

// no way did i write this, so here is an explanation
// https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
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
        const campaignTitle = campaign.translations[lang]?.title.toLowerCase() 
                                || campaign.title.toLowerCase();
        return campaignTitle.includes(query.toLowerCase());
    });
    const searchDescriptions = campaigns.filter((campaign) => {
        const campaignDescription = campaign.translations[lang]?.description.toLowerCase() 
                                    || campaign.description.toLowerCase();
        return campaignDescription.includes(query.toLowerCase());
    });

    return arrayUnique(searchTitles.concat(searchDescriptions));
};

const filterCampaignsByCategory = (campaigns, categoryState) => {
    let activeFilter = categoryState.replace('Filter', '');

    return campaigns.filter((campaign) => {
        const campaignCategory = campaign.category;
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
                    placeholder={this.props.language==='en' ? 'Search...' : 'Buscar...'}
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
                campaigns: [],
                searchQuery:'',
                healthcareFilter: '',
                educationFilter: '',
                businessFilter: '',
                nutritionFilter: '',
                activeCategory: '',
            }
    }

    async componentDidMount(){
        var lang = LanguageService.getLanguage()
        try {
            const res = await api.get('/campaigns/');
            if (res.data.data.campaigns) {
                this.setState({
                    campaigns: res.data.data.campaigns,
                });
            }    
        } catch (err) {
            console.log('err');
        } finally {
            this.setState({
                language: lang,
                loaded:true
            });
        } 
    }
    
    handle_change = (value) => {
        this.setState({ value })
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
            return filterCampaignsBySearch(this.state.campaigns, this.state.searchQuery, this.state.language);
        } else if (this.state.healthcareFilter.length !== 0) {
            return filterCampaignsByCategory(this.state.campaigns, this.state.activeCategory);
        }
        return this.state.campaigns;
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
                    <div className='static-header'>
                        <img 
                            alt='line-left'
                            src={pics['line-left']}
                            width='375px' height='375px'
                        />
                        <img 
                            alt='photo'
                            src={pics['header-photo']}
                            width='375px' height='375px'
                        />
                        <img 
                            alt='textbar'
                            src={pics['header-bar']}
                            width='375px' height='375px'
                        />
                        <img 
                            alt='line-right'
                            src={pics['line-right']}
                            width='375px' height='375px'
                        />
                    </div>

                        {/* <img 
                            alt='healthcare-pic'
                            src={pics.healthcare}
                            width='75px' height='75px'
                            className={this.state.healthcareFilter}
                            onClick={() => {
                                this.handleFilter('healthcareFilter');
                            }} 
                        /> */}
                    <SearchBar 
                        searchQuery={this.state.searchQuery}
                        setSearchQuery={this.setSearchQuery}
                        language={this.state.language}
                    />
                </div>

    
                <hr id="hr-top"/>

                 <Grid container spacing={5} style={{alignContent:'center', alignItems:'flex-start'}}>
                    {filteredCampaigns.sort(() => 0.5 - Math.random()).map((cam, i) => {
                            count++;
                            return(
                                <Grid item xs={12} sm={3} key={i}>
                                    <CampaignCard
                                        campaign={cam}
                                        language={this.state.language}
                                        amount={cam.raised + cam?.zelleRaised}
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
