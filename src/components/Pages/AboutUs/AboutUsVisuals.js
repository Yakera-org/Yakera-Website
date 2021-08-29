import React from 'react'
import { Grid } from '@material-ui/core';
import titleImg from '../../../pics/y.png'
import ContentSection from './ContentSection';
import illustracion1 from '../../../pics/ill_1.PNG'
import illustracion2 from '../../../pics/ill_2.PNG'
import illustracion3 from '../../../pics/ill_3.PNG'
import illustracion4 from '../../../pics/ill_4.PNG'
import content from './texts.json'
import TeamSection from './TeamSection';

const illustracions = [illustracion4, illustracion3, illustracion2, illustracion1]


function AboutUsVisuals() {
    return (
        <div className='about-us-visuals'>
            <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12} sm={6} >
                        <div className='about-us-top-text'>
                            <h1>Check out the <b>Campaigns</b> in
                            </h1>
                            <h1 id='labels'>
                                <a id='green' href='/campaigns'>Education</a>,&nbsp;
                                <a id='yellow' href='/campaigns'> Nutrition</a>,&nbsp;
                                <a id='red' href='/campaigns'> Healthcare</a>&nbsp;and&nbsp;
                                <a id='blue' href='/campaigns'> Small Business</a>
                            </h1>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <div className='about-us-top-img'>
                            <img src={titleImg} alt='top-img' />
                        </div>
                    </Grid>

                <Grid item xs={12} sm={12} >
                    <div className='about-us-banner'>
                        <p>Read the stories written by people on the platform</p>
                    </div>
                </Grid>
                {
                    content.content.map((element,i) => {
                        return(
                            <Grid key={i} item xs={12} sm={6} >
                                <div className='about-us-content-section'>
                                    <ContentSection
                                        title={element.title}
                                        description={element.description}
                                        image={illustracions[i]}
                                    />
                                </div>
                            </Grid>
                        )                        
                    })
                }

            </Grid>

            <hr style={{margin:' 50px 0 '}}/>

            <TeamSection />
        </div>
    )
}

export default AboutUsVisuals
