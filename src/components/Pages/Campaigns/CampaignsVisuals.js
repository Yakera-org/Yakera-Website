import React from "react";
import { Grid, Hidden } from '@material-ui/core';

import pics from './pics';
import SearchBar from "./Searchbar";
import Pageination from "./Pageination";

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
                <Grid item xs={6} sm={3} className='header-mid-img'>
                    <img alt='donate-figure' src={pics['header-photo']} />
                </Grid>

                <Grid item xs={6} sm={3} className='mid-content'>
                    <div className='main-text'>
                        <b>{EN ? 'Support a story, ' : 'Apoya una historia, '}</b>
                        <span>{EN ? 'change a life' : 'cambia una vida'}</span>
                    </div>
                                
                    <div className='bubble-text'>
                        <div className='bubble-quote'>
                            <img alt='donate-figure' src="https://assets.yakera.org/yakera/profile-icon-1.webp" />
                            <b> {"Sara López"} </b> <br />
                            {EN ? 'For a world full of Yakera!' : '¡Por un mundo lleno de Yakera!'}
                        </div>
                        <div className='bubble-digit'>
                            {'$20'}
                        </div>
                    </div>
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
                    {EN ? 'Find a campaign.' : 'Find a campaign.'}
                </h2>

                <SearchBar EN={EN} />
                
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
                    props.currentFilter || props.currentCategory
                    ?
                    <button className="reset-filters">
                        Reset Filters
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
                 LoadCampaignsForPage={props.LoadCampaignsForPage}
            />

        </div>
    );
}

export default CampaignsVisuals;