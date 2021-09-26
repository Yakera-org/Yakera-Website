import React from 'react'
import { Grid } from '@material-ui/core';
import ContentSection from './ContentSection';
import content from './texts.json'
import TeamSection from './TeamSection';

const illustracion1 = 'https://yakera-files.s3.us-east-2.amazonaws.com/yakera/illustration-aboutus-1.png'
const illustracion2 = 'https://yakera-files.s3.us-east-2.amazonaws.com/yakera/illustration-aboutus-2.png'
const illustracion3 = 'https://yakera-files.s3.us-east-2.amazonaws.com/yakera/illustration-aboutus-3.png'
const illustracion4 = 'https://yakera-files.s3.us-east-2.amazonaws.com/yakera/illustration-aboutus-4.png'
const illustracions = [illustracion4, illustracion3, illustracion2, illustracion1]
const titleImg = 'https://yakera-files.s3.us-east-2.amazonaws.com/yakera/photos-aboutus.png'
const worldImg = 'https://yakera-files.s3.us-east-2.amazonaws.com/yakera/worldmap.png'


function AboutUsVisuals() {
 
    return (
        <div className='about-us-visuals'>
            <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12} sm={6} >
                        <div className='about-us-top-img'>
                            <img src={titleImg} alt='top-img' />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} className='about-title-text' >
                        <p>
                            Yakera unlocks international solidarity through empathy and storytelling. We revolutionize humanitarian aid, one story at a time.
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <div className='about-us-top-text'>
                            <h1>Check out the <b>Campaigns</b> in
                            </h1>
                            <h1 id='labels'>
                                <a id='green' href='/campaigns'>Education</a>,&nbsp;
                                <a id='yellow' href='/campaigns'>Nutrition</a>,&nbsp;
                                <a id='red' href='/campaigns'>Healthcare</a>&nbsp;and&nbsp;
                                <a id='blue' href='/campaigns'>Small Business</a>
                            </h1>
                        </div>
                    </Grid>                
                <Grid item xs={12} sm={12} >
                    <div className='about-us-banner'>
                        <p>Read the stories written by people on the platform</p>
                    </div>
                </Grid>
                
                <Grid item xs={12} sm={6} className='about-world-text' >
                    <section>
                        <div id='percent'>
                            100%
                        </div>
                        <p>
                            <b>Of what you chip in goes to people directly:</b>
                            &nbsp;no overhead costs, no fees. We are changing how humanitarian aid is delivered around the world.
                        </p>
                    </section>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <div className='about-us-world-img'>
                        <img src={worldImg} alt='top-img' />
                    </div>
                </Grid>
                <Grid container spacing={0} style={{ alignItems:'flex-start', textAlign:'left'}}>
                {
                    content.content.map((element,i) => {
                        return(
                            <Grid key={i} item xs={12} sm={3} >
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

            </Grid>

            <hr style={{margin:' 50px 10px '}}/>

            <TeamSection />
        </div>
    )
}

export default AboutUsVisuals
