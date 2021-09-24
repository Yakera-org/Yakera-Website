import React from 'react'
import { Grid } from '@material-ui/core';
import './AboutUs.css'
import text from './texts.json'
import members from './teamMembers.json' 

function TeamSection() {
    return (
        <div className='about-us-team'>
            <h1>Our Team</h1>
            <br />
            <p>
                {text['team-text']}
            </p>
            <div className='about-us-team-pics'>
                { members.divisions.map((division, i) => {
                    console.log(division)
                    return(
                        <div key={i}>                
                            <h2>
                                {division.name}
                            </h2>
                            <Grid container spacing={0} direction="row" style={{ display: 'flex'}}>
                                {
                                    division.members.map((member,i) => {
                                        return(
                                            <Grid item xs={12} sm={3} className='member-pic' key={i}>
                                                <div className='img-wrapper'>
                                                    <img src={member.picture} alt='profile' />
                                                </div>
                                                <p>{member.name}</p>
                                                <label id='position'>{member.position}</label>
                                                <a id="icon" href={member.link} rel="noopener noreferrer"  target="_blank">
                                                    <i className="fab fa-linkedin fa-2x" ></i>
                                                </a>
                                            </Grid>
                                        )                                        
                                    })
                                }                                
                            </Grid> 
                        </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default TeamSection
