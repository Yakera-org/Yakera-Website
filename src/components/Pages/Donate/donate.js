import React, { Component } from 'react';
import CampaignCard from './campaignCard';
import Author from '../../author';
import  { Grid } from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";
import pics from './pics';
import SearchIcon from '@material-ui/icons/Search';
import { Form, InputGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';

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
                currentItems: null,
                pageCount: 0,
                itemOffset: 0,
                filteredCampaigns: [],
                selected: null,
                loadingPage: false,
            }
    }

    async componentDidMount(){
        var lang = LanguageService.getLanguage()
        try {
            const res = await api.get('/campaigns/');
            if (res.data.data.campaigns) {
                this.setState({
                    campaigns: res.data.data.campaigns,
                    filteredCampaigns: res.data.data.campaigns,
                    currentItems: res.data.data.campaigns.slice(this.state.itemOffset, 20),
                    pageCount: Math.ceil(res.data.data.campaigns.length / 20)
                });
            }    
        } catch (err) {
            console.log('err');
        } finally {
            this.setState({
                language: lang,
                loaded: true,
                // filteredCampaigns: this.state.campaigns,
            });
        } 
        // this.setState({
        //     // currentItems: this.state.filteredCampaigns.slice(this.state.itemOffset, 20),
        //     pageCount: 1,
        // });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.itemOffset !== prevState.itemOffset) {
            this.setState({ loadingPage: true });
            const endOffset = this.state.itemOffset + 20;   // latter is number of items per page
            console.log(`Loading items from ${this.state.itemOffset} to ${endOffset}`);
            this.setState({
                currentItems: this.state.filteredCampaigns.slice(this.state.itemOffset, endOffset),
                pageCount: Math.ceil(this.state.filteredCampaigns.length / 20),
            },
            (() => {
                this.setState({ loadingPage: false });
            }));
        }
        
        if (this.state.searchQuery !== prevState.searchQuery || this.state.healthcareFilter !== prevState.healthcareFilter) {
            if (this.state.searchQuery.length !== 0) {
                this.setState({filteredCampaigns: filterCampaignsBySearch(this.state.campaigns, this.state.searchQuery, this.state.language)});
                // return filterCampaignsBySearch(this.state.campaigns, this.state.searchQuery, this.state.language);
            } else if (this.state.healthcareFilter.length !== 0) {
                this.setState({filteredCampaigns: filterCampaignsByCategory(this.state.campaigns, this.state.activeCategory)});
                // return filterCampaignsByCategory(this.state.campaigns, this.state.activeCategory);
            } else {
                this.setState({filteredCampaigns: this.state.campaigns});
            }
        }
        // return this.state.campaigns;
    };

    handlePageClick = (e) => {
        const selected = e.selected;
        const newOffset = (selected * 20) % this.state.filteredCampaigns.length;
        console.log(`User requested page number ${e.selected}, which is offset ${newOffset}`);
        this.setState({
            itemOffset: newOffset,
            selected,
        });
    };
    
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
            this.setState({filteredCampaigns: filterCampaignsBySearch(this.state.campaigns, this.state.searchQuery, this.state.language)});
            return filterCampaignsBySearch(this.state.campaigns, this.state.searchQuery, this.state.language);
        } else if (this.state.healthcareFilter.length !== 0) {
            this.setState({filteredCampaigns: filterCampaignsByCategory(this.state.campaigns, this.state.activeCategory)});
            return filterCampaignsByCategory(this.state.campaigns, this.state.activeCategory);
        }
        this.setState({filteredCampaigns: this.state.campaigns});
        return this.state.campaigns;
    };
   
    render(){
        var count = 0;
        // var filteredCampaigns = this.handleFilteredCampaigns();
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
                    <div className='campaign-filter'>
                        <img 
                            alt='healthcare-pic'
                            src={pics.healthcare}
                            width='75px' height='75px'
                            className={this.state.healthcareFilter}
                            onClick={() => {
                                this.handleFilter('healthcareFilter');
                            }} 
                        />
                        <img
                            alt='education-pic'
                            src={pics.education}
                            width='75px' height='75px'
                            className={this.state.educationFilter}
                            onClick={() => {
                                this.handleFilter('educationFilter');
                            }} 
                        />
                        <img 
                        alt='business-pic'
                            src={pics.business}
                            width='75px' height='75px'
                            className={this.state.businessFilter}
                            onClick={() => {
                                this.handleFilter('businessFilter');
                            }} 
                        />
                        <img
                            alt='nutrition-pic'
                            src={pics.nutrition}
                            width='75px' height='75px'
                            className={this.state.nutritionFilter}
                            onClick={() => {
                                this.handleFilter('nutritionFilter');
                            }} 
                        />
                    </div>
                    <SearchBar 
                        searchQuery={this.state.searchQuery}
                        setSearchQuery={this.setSearchQuery}
                        language={this.state.language}
                    />
                </div>

    
                <hr id="hr-top"/>

                <ReactPaginate
                    breakLabel='...'
                    nextLabel={<NavigateNext fontSize='inherit' />}
                    previousLabel={<NavigateBefore fontSize='inherit' />}
                    onPageChange={this.handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={this.state.pageCount}
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    marginPagesDisplayed={2}
                    containerClassName="pagination"
                    activeClassName="active"
                    forcePage={this.state.selected}
                />

                <Grid container spacing={5} style={{alignContent:'center', alignItems:'flex-start'}}>
                    {/* {filteredCampaigns.sort(() => 0.5 - Math.random()).map((cam, i) => {
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
                    })}     */}
                    {
                        this.state.loadingPage ?
                            // <HashLoader
                            //     size={150}
                            //     color={"#01224d"}
                            //     loading={this.state.loadingPage}
                            // />
                            'Loading...'
                        : this.state.currentItems.map((cam, i) => {
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
                        })
                    }

                </Grid>

                <ReactPaginate
                    breakLabel='...'
                    nextLabel={<NavigateNext fontSize='inherit' />}
                    previousLabel={<NavigateBefore fontSize='inherit' />}
                    onPageChange={this.handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={this.state.pageCount}
                    renderOnZeroPageCount={null}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    marginPagesDisplayed={2}
                    containerClassName="pagination"
                    activeClassName="active"
                    forcePage={this.state.selected}
                />
    
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
