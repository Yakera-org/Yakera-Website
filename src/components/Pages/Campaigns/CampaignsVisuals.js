import React, {useState} from "react";
import { Grid, Hidden, Button } from '@material-ui/core';

import pics from './pics';
import SearchBar from "./Searchbar";

function CampaignsVisuals(props) {

    const [hasLoaded, setHasLoaded] = useState(false);
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
                    <Grid item xs={4} sm={4} className="quant-filter">
                        {EN ? 'Date' : 'Date'}
                    </Grid>
                    <Grid item xs={4} sm={4} className="quant-filter">
                        {EN ? 'Percentage' : 'Percentage'}
                    </Grid>
                    <Grid item xs={4} sm={4} className="quant-filter">
                        {EN ? 'Money raised' : 'Money Raised'}
                    </Grid>
                </Grid>

                <Grid container spacing={0} className="category-filter" style={{ alignItems: 'flex-start' }}>
                    <Grid item xs={3} sm={3} className="cat-filter">
                        <Button>
                            {EN ? 'Healthcare' : 'Atención Médica'}
                        </Button>
                    </Grid>
                    <Grid item xs={3} sm={3} className="cat-filter">
                        <Button>
                            {EN ? 'Education' : 'Educación'}
                        </Button>
                    </Grid>
                    <Grid item xs={3} sm={3} className="cat-filter">
                        <Button>
                            {EN ? "Small Business" : "Pequeños Negocios"}
                        </Button>
                    </Grid>
                    <Grid item xs={3} sm={3} className="cat-filter">
                        <Button>
                            {EN ? "Nutrition" : "Alimentación"}
                        </Button>
                    </Grid>
                </Grid>

            <hr style={{width:"100%"}}/>
            </div>


        </div>
    );
}

export default CampaignsVisuals;