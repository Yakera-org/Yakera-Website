import React from 'react'
import { Grid } from '@material-ui/core';
import './AboutUs.css'
import members from './advisoryBoardMembers.json' 

function AdvisoryBoardSection(props) {
    const EN = props.EN
    return (
        <div className='about-us-team'>
            <h1>{EN ? 'Our Advisory Board' : 'Nostros Junta Consultiva'}</h1>
            <div className='about-us-team-pics'>
                { members.members.map((member, i) => {
                    return(
                        <div key={i}> 
                            <Grid container spacing={0} direction="row" style={{ display: 'flex'}} justify="flex-end" alignItems="center">
                                <Grid item xs={12} sm={3} spacing={0} className='member-pic' key={i}>
                                    <div className='img-wrapper'>
                                        <img src={member.picture} alt='profile' />
                                    </div>
                                </Grid>  
                                <Grid item xs={12} sm={9} spacing={0} className='member-text' key={i}>
                                    <p id="name">{member.name}</p>
                                    <label id='position'>{member.titles}</label>

                                    <br />

                                    <p>{member.descriptions}</p>

                                </Grid>                     
                            </Grid> 
                        </div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default AdvisoryBoardSection
