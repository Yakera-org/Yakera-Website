import React from 'react';
import advisoryBoard from './advisoryBoardMembers.json';
import { Grid } from '@material-ui/core';

const AdvisoryBoardSection = ({
    EN
}) => {
    return (
        <div className='about-us-advisory-board'>
            <h1>
                {EN ? 'Advisory Board' : 'Junta Consultiva'}
            </h1>
            <br />
            <div className='about-us-advisory-board-pics'>
                {advisoryBoard.members.map((member, i) => {
                    return(
                        <Grid container spacing={1} direction="row">
                            <Grid item xs={3} className='member-pic'>
                                <div className='img-wrapper'>
                                    <img src={member.picture} alt='profile' />
                                </div>
                            </Grid>
                            <Grid item xs={9}>
                                <Grid container spacing={0} direction='column'>
                                    <Grid item>
                                        <p id='name'>{member.name}</p>
                                    </Grid>
                                    {member.titles.map((title, j) => {
                                        return(
                                            <Grid item>
                                                <label id='title'>{title}</label>
                                            </Grid>
                                        )
                                    })}
                                    <Grid item id='description'>
                                    {member.descriptions.map((description, k) => {
                                        return(
                                                <p>{description}</p>
                                                )
                                            })}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })}
            </div>
        </div>
    )
};

export default AdvisoryBoardSection;
