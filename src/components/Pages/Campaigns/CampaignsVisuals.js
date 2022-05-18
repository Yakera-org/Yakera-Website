import React, {useState} from "react";
import { Grid, Hidden, CardMedia, Button } from '@material-ui/core';

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

            <SearchBar EN={EN} />
        </div>
    );
}

export default CampaignsVisuals;