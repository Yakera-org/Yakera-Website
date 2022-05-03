import React, { Component } from 'react';
import CampaignCard from './campaignCard';
import Author from '../../author';
import { Grid, Hidden, CardMedia, Button } from '@material-ui/core';
import HashLoader from "react-spinners/HashLoader";
import pics from './pics';
import SearchIcon from '@material-ui/icons/Search';
import { Form, InputGroup } from 'react-bootstrap';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';

import './donate.css';
import api from '../../../services/api';
import LanguageService from '../../../services/language';

// no way did i write this, so here is an explanation
// https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items
const arrayUnique = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; i++) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

const filterCampaignsBySearch = (campaigns, query, lang) => {
    if (!query) {
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
    render() {
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
                    placeholder={this.props.language === 'en' ? 'Search...' : 'Buscar...'}
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

class donate extends Component {
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
                dateFilter: '',
                percentageFilter: '',
                moneyRaisedFilter: '',
                activeGeneralFilter: '',
            }
    }

    async componentDidMount() {
        var lang = LanguageService.getLanguage()
        try {
            const res = await api.get('/campaigns/');
            if (res.data.data.campaigns) {
                this.setState({
                    campaigns: res.data.data.campaigns.sort(() => 0.5 - Math.random()),
                });
            }
        } catch (err) {
            console.log('err');
        } finally {
            this.setState({
                language: lang,
                loaded: true
            });
        }
    }

    handle_change = (value) => {
        this.setState({ value })
    }  

    filterCampaignsByDate = (cams) => {
        var filteredCams = cams.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        return filteredCams;
    } 
    filterCampaignsByRevDate = (cams) => {
        var filteredCams = cams.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)).reverse();
        return filteredCams;
    }  
    filterCampaignsByMoney = (cams) => {
        var filteredCams = cams.sort((a, b) => (a.raised + a.zelleRaised) - (b.raised + b.zelleRaised));
        return filteredCams;
    } 
    filterCampaignsByRevMoney = (cams) => {
        var filteredCams = cams.sort((a, b) => (a.raised + a.zelleRaised) - (b.raised + b.zelleRaised)).reverse();
        return filteredCams;
    } 
    filterCampaignsByPer = (cams) => {
        var filteredCams = cams.sort((a, b) => a.percentage - b.percentage);
        return filteredCams;
    } 
    filterCampaignsByRevPer = (cams) => {
        var filteredCams = cams.sort((a, b) => a.percentage - b.percentage).reverse();
        return filteredCams;
    } 

    handleChangeSortByDate = (cams) => {
        if(this.state.dateFilter === 'increase') {
            return this.filterCampaignsByRevDate(cams);
        } else if(this.state.dateFilter === 'decrease') {
            return this.filterCampaignsByDate(cams);
        }
    };
    handleChangeSortByPercentage = (cams) => {
        if(this.state.percentageFilter === 'increase') {
            return this.filterCampaignsByPer(cams);
        } else if(this.state.percentageFilter === 'decrease') {
            return this.filterCampaignsByRevPer(cams);
        }
    };
    handleChangeSortByMoneyRaised = (cams) => {
        if(this.state.moneyRaisedFilter === 'increase') {
            return this.filterCampaignsByMoney(cams);
        } else if(this.state.moneyRaisedFilter === 'decrease') {
            return this.filterCampaignsByRevMoney(cams);
        } 
    };
    
    handleGeneralFilter = (filter) => {
        // if(this.state.activeGeneralFilter !== filter) {
        //     this.setState({[filter]: ''});
        // }
        if(filter === 'dateFilter') {
            this.setState({percentageFilter: '', moneyRaisedFilter: ''});
        } else if(filter === 'percentageFilter') {
            this.setState({dateFilter: '', moneyRaisedFilter: ''});
        } else {
            this.setState({dateFilter: '', percentageFilter: ''});
        }

        if(this.state[filter] === '') {
            this.setState({[filter]: 'increase'});
            this.setState({activeGeneralFilter: filter});
        } else if(this.state[filter] === 'increase') {
            this.setState({[filter]: 'decrease'});
            this.setState({activeGeneralFilter: filter});
        } else {
            this.setState({[filter]: ''});
            this.setState({activeGeneralFilter: ''});
        }
    };

    handleGeneralFilteredCampaigns = (cams) => {
        if(this.state.activeGeneralFilter === 'dateFilter') {
            return this.handleChangeSortByDate(cams);
        } else if(this.state.activeGeneralFilter === 'percentageFilter') {
            return this.handleChangeSortByPercentage(cams);
        } else if(this.state.activeGeneralFilter === 'moneyRaisedFilter') {
            return this.handleChangeSortByMoneyRaised(cams);
        } else {
            return cams;
        }
    };

    setSearchQuery = (e) => {
        this.setState({
            healthcareFilter: '',
            educationFilter: '',
            businessFilter: '',
            nutritionFilter: '',
        });

        this.setState({ searchQuery: e });
    }

    handleFilter = (categoryState) => {
        this.setState({ searchQuery: '' });

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

            this.setState({ [categoryState]: 'active' });
            this.setState({ activeCategory: categoryState });
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

    render() {
        var count = 0;
        var filteredCampaigns = (() => {
            let filtCams = this.handleFilteredCampaigns();
            return this.handleGeneralFilteredCampaigns(filtCams);
        })();
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

                    <hr id="hr-top" />
                </div>
            )
        } else {

            return (
                <div className="donate-page">
                    <div className="header-top">
                        <Grid container spacing={0} style={{ alignItems: 'flex-start' }}>
                            <Hidden xsDown>
                                <Grid container item={true} sm={3} className='header-left'>
                                    <img alt='line-left' src={pics['line-left']} />
                                </Grid>
                            </Hidden>
                            <Grid container item={true} xs={6} sm={3} className='header-mid-img'>
                                <img alt='donate-figure' src={pics['header-photo']} />
                            </Grid>

                            <Grid container item={true} xs={6} sm={3}>
                                <section>
                                    <div className='mid-text-div' style={{ width: '100%' }}>
                                        {this.state.language === 'en' ? 'Support a story, ' : 'Apoya una historia, '}
                                        <span style={{ color: '#ea8737' }}>{this.state.language === 'en' ? 'change a life' : 'cambia una vida'}</span>
                                        <br />
                                        <CardMedia className="mid-bubble-div"
                                            component="img"
                                            alt='header-bubble'
                                            image={pics['header-bar']}
                                            style={{
                                                maxWidth: "120%",
                                                float: "light",
                                            }}
                                        />
                                        <div className='bubble-text'>
                                            <div className='bubble-quote'>
                                                <b> {"Sara López"} </b> <br />
                                                {this.state.language === 'en' ? 'For a world full of Yakera!' : '¡Por un mundo lleno de Yakera!'}
                                            </div>
                                            <div className='bubble-digit'>
                                                {'$20'}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </Grid>
                            <Hidden xsDown>
                                <Grid container item={true} sm={3} className='header-right'>
                                    <img
                                        alt='line-right'
                                        src={pics['line-right']}
                                        width='375px'
                                    />
                                </Grid>
                            </Hidden>
                            <br />
                        </Grid>
                    {/* </div>
                <div className="header-top"> */}
                    {/* <div className='category-filter'>
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
                    </div> */}

                    <Grid
                        container
                        spacing={0}
                        className='general-filter'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Grid item xs={12} sm={4}>
                            <button
                                name='date'
                                className={this.state.activeGeneralFilter === 'dateFilter' ? 'active-general-filter' : ''}
                                onClick={() => {
                                    this.handleGeneralFilter('dateFilter');
                                }}
                            >
                                Sort by Date 
                                {this.state.dateFilter === 'increase' 
                                    ? <ArrowUpward fontSize='small' />
                                    : this.state.dateFilter === 'decrease'
                                    ? <ArrowDownward fontSize='small' />
                                    : ''
                                }
                            </button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <button
                                name='percentage'
                                className={this.state.activeGeneralFilter === 'percentageFilter' ? 'active-general-filter' : ''}
                                onClick={() => {
                                    this.handleGeneralFilter('percentageFilter');
                                }}
                            >
                                Sort by Percentage 
                                {this.state.percentageFilter === 'increase' 
                                    ? <ArrowUpward fontSize='small' />
                                    : this.state.percentageFilter === 'decrease'
                                    ? <ArrowDownward fontSize='small' />
                                    : ''
                                }
                            </button>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <button
                                name='moneyRaised'
                                className={this.state.activeGeneralFilter === 'moneyRaisedFilter' ? 'active-general-filter' : ''}
                                onClick={() => {
                                    this.handleGeneralFilter('moneyRaisedFilter');
                                }}
                            >
                                Sort by Money Raised 
                                {this.state.moneyRaisedFilter === 'increase' 
                                    ? <ArrowUpward fontSize='small' />
                                    : this.state.moneyRaisedFilter === 'decrease'
                                    ? <ArrowDownward fontSize='small' />
                                    : ''
                                }
                            </button>
                        </Grid>
                    </Grid>

                    <div className='category-filter'>
                        <Button
                            className={this.state.healthcareFilter}
                            onClick={() => {
                                this.handleFilter('healthcareFilter');
                            }} 
                        >
                            {this.state.language === 'en' ? 'Healthcare' : 'Atencíon médica'}
                        </Button>
                        <Button
                            className={this.state.educationFilter}
                            onClick={() => {
                                this.handleFilter('educationFilter');
                            }} 
                        >
                            {this.state.language === 'en' ? 'Education' : 'Educacíon'}
                        </Button>
                        <Button
                            className={this.state.businessFilter}
                            onClick={() => {
                                this.handleFilter('businessFilter');
                            }} 
                        >
                            {this.state.language === "en" ? "Small Business" : "Pequeñuos negocios"}
                        </Button>
                        <Button
                            className={this.state.nutritionFilter}
                            onClick={() => {
                                this.handleFilter('nutritionFilter');
                            }} 
                        >
                            {this.state.language === "en" ? "Food" : "Comida"}
                        </Button>
                    </div>

                    
                    <SearchBar 
                        searchQuery={this.state.searchQuery}
                        setSearchQuery={this.setSearchQuery}
                        language={this.state.language}
                    />
                </div>

                    <hr id="hr-top" />

                 <Grid container spacing={5} style={{alignContent:'center', alignItems:'flex-start'}}>
                    {filteredCampaigns.map((cam, i) => {
                            count++;
                            return (
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

                    <div style={{ textAlign: 'center' }}>
                        <p id='no-cam'>
                            {count === 0 ? this.state.language === 'en' ? 'No campaigns in this category' : 'No hay campañas en esta categoría.' : ''}
                        </p>
                    </div>

                    <div className='bottom-images'>
                        <Grid container spacing={0}>
                            <Grid item sm={6} xs={12}>
                                <img
                                    alt='bottom-img'
                                    src={pics['bottom-1']}
                                    className='img-1'
                                />
                                <p className='p1'><span>{this.state.language === 'en' ? 'All of out campaigns are verified' : 'Todas nuestras campañas son verificadas'}</span>{this.state.language ? ' before publication' : ' antes de su publicación'}</p>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <img
                                    alt='bottom-img'
                                    src={pics['bottom-2']}
                                />
                                <p className='p2'><span>{this.state.language === 'en' ? '100% ' : 'El 100% '}</span>{this.state.language ? 'of your donations ' : ' de tus donaciones'} <span>{this.state.language ? ' reach their recipient' : ' llegan a su destinatario'}</span></p>
                            </Grid>
                        </Grid>
                    </div>

                    <div className='bottom'>
                        <Grid container spacing={0}>
                            <Grid item sm={6} xs={12}>
                                <img
                                    alt='campaign-img'
                                    src={pics['campaign-img']}
                                    className='campaign-img'
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Grid container spacing={0}>
                                    <Grid item sm={12} xs={12}>
                                        <img
                                            alt='quotes'
                                            src={pics['quote']}
                                            className='quote'
                                        />
                                    </Grid>
                                    <Grid item sm={12} xs={12} style={{marginBottom: '20px'}}>
                                        <p>
                                            {this.state.language === 'en'
                                                ? "Many people around the world started to donate. I can't explain how happy I feel - very soon my dream of access to quality education will come true!"
                                                : "Muchas personas alrededor del mundo empezaron a donar. No puedo explicar lo feliz que me siento. ¡Muy pronto mi sueño de acceder a una educación de calidad se hará realidad"
                                            }
                                        </p>
                                        <span>
                                            Alexandra Requena
                                            <br />
                                            {this.state.language === 'en'
                                                ? 'Venezuelan Malala'
                                                : 'Malala Venezolana'
                                            }
                                        </span>
                                    </Grid>
                                    <Grid item sm={12} xs={12}>
                                        <button>
                                            {this.state.language === 'en' ? 'Read more success stories here' : 'Leer mas historias de exito aqui'}
                                        </button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{ marginTop: '5%' }}>
                        <Author />
                    </div>

                </div>
            )
        }
    }
}

export default donate;
