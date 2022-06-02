import React from "react";
import { Grid, Hidden } from '@material-ui/core';

import pics from './pics';
import SearchBar from "./Searchbar";
import Pageination from "./Pageination";
import HighlightedCampaign from "./HighlightedCampaign";

const nameDictEN = {
    "education": "Education",
    "healthcare": "Healthcare",
    "small_business":"Small Business",
    "nutrition": "Nutrition"
  };
  const nameDictSP = {
    "education":"Educación",
    "healthcare":"Atención Médica",
    "nutrition":"Nutrición",
    "small_business":"Pequeños Negocios"
  };

function CampaignsVisuals(props) {

    const EN = props.EN;

    return (
        <div>
            <Grid container spacing={0} className="grid-header" style={{ alignItems: 'flex-start' }}>
                <Hidden xsDown>
                    <Grid item sm={3} className='header-left' style={{ textAlign: "center" }}>
                        <img alt='line-left' src={pics['line-left']} />
                    </Grid>
                </Hidden>

                <Grid item xs={12} sm={6}>
                    <HighlightedCampaign EN={EN} campaign={props.highlightStory}/>
                </Grid>
                
                <Hidden xsDown>
                    <Grid item={true} sm={3} className='header-right' style={{ textAlign: "center" }}>
                        <img
                            alt='line-right'
                            src={pics['line-right']}
                            width='375px'
                        />
                    </Grid>
                </Hidden>
                <br />
            </Grid>

            <div className="filter-section">
                <h2>
                    {EN ? 'Find a campaign.' : 'Buscar una campaña.'}
                </h2>

                <SearchBar 
                    EN={EN} 
                    setSearch={props.setSearch}
                    searchQuery={props.currentSearchQuery}                
                    setSearchQuery={props.setCurrentSearchQuery}
                />
                
                <p>{EN ? 'Sort by:' : 'Sort by:'}</p>

                <Grid container spacing={0} className="filters" style={{ alignItems: 'flex-start' }}>
                    <Grid item xs={4} sm={4} id="quant-filter" name="date" onClick={props.setFilter} className={props.currentFilter ==="date" ? "on" : "off"}>
                        {EN ? 'Date' : 'Date'} &nbsp; <b style={{color:"#ea8737"}}>{props.dateOrder ? (props.dateOrder === "asc" ? "↑" : "↓" ) : ""}</b> 
                    </Grid>
                    <Grid item xs={4} sm={4} id="quant-filter" onClick={props.setFilter} name="percent" className={props.currentFilter ==="percent" ? "on" : "off"}>
                        {EN ? 'Percentage' : 'Percentage'}
                    </Grid>
                    <Grid item xs={4} sm={4} id="quant-filter" onClick={props.setFilter} name="raised" className={props.currentFilter ==="raised" ? "on" : "off"}>
                        {EN ? 'Money raised' : 'Money Raised'}
                    </Grid>
                </Grid>

                <Grid container spacing={0} className="category-filter" style={{ alignItems: 'flex-start' }}>
                    {["healthcare", "education", "small_business", "nutrition"].map((cat,i) => {
                        return(
                            <Grid key={i} item xs={3} sm={3} className="cat-filter">
                                <button onClick={props.setCategory} name={cat} id={cat} className={props.currentCategory===cat?`on-${cat}`:"off"}>
                                    {EN ? nameDictEN[cat] : nameDictSP[cat]}
                                </button>
                            </Grid>
                        )                        
                    })}                    
                </Grid>
                {
                    props.currentFilter || props.currentCategory || props.currentSearchQuery
                    ?
                    <button onClick={props.setFilter} name="reset" className="reset-filter">
                        {EN ? "Reset Filters" : "Restablecer filtros"}
                    </button>
                    :
                    ""

                }

            <hr style={{width:"100%", marginBottom:"10px"}}/>
            </div>

            <Pageination 
                 EN={EN} 
                 loading={props.loading}
                 campaigns = {props.campaigns}
                 page = {props.page}
                 pageCount = {props.pageCount}
                 setPage={props.setPage}
            />

            <Grid container spacing={0} className='bottom-images'>
                <Grid item sm={6} xs={12} className='img-1'>
                    <img
                        alt='bottom-img'
                        src={pics['bottom-1']}
                        
                    />
                    <p className='p1'><span>{EN ? 'All of out campaigns are verified' : 'Todas nuestras campañas son verificadas'}</span>{EN ? ' before publication.' : ' antes de su publicación.'}</p>
                </Grid>
                <Grid item sm={6} xs={12} className='img-2'>
                    <img
                        alt='bottom-img'
                        src={pics['bottom-2']}
                        
                    />
                    <p className='p2'><span>{EN ? '100% ' : 'El 100% '}</span>{EN ? 'of your donations ' : ' de tus donaciones'} <span>{EN ? ' reach their recipient.' : ' llegan a su destinatario.'}</span></p>
                </Grid>
            </Grid>

            {/* <Grid container spacing={0} className='bottom-quote'>
                <Grid item sm={6} xs={12}>
                    <img
                        alt='campaign-img'
                        src={pics['campaign-img']}
                        className='campaign-img'
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Grid container spacing={0} className='campaign-quote'>
                        <Grid item sm={12} xs={12}>
                            <img
                                alt='quotes'
                                src={pics['quote']}
                                className='quote'
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <p>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span> sed du elusmad tempor incididunt ut labore et dolore magana aliqua. Quis ipsum suspendiase ultrices gravida.
                            </p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> */}

        </div>
    );
}

export default CampaignsVisuals;