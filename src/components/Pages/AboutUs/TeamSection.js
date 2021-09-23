import React from 'react'
import { Grid } from '@material-ui/core';
import './AboutUs.css'
import text from './texts.json'

function TeamSection() {
    return (
        <div className='about-us-team'>
            <h1>Our Team</h1>
            <br />
            <p>
                {text['team-text']}
            </p>
            <div className='about-us-team-pics'>
                <Grid container spacing={0}>
                    {
                        
                    }
                    
                </Grid>
            </div>
        </div>
    )
}

export default TeamSection
