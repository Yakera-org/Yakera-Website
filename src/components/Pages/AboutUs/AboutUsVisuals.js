import React from 'react'
import { Grid } from '@material-ui/core';
import ContentSection from './ContentSection';
import content from './texts.json'
import AdvisoryBoardSection from './AdvisoryBoardSection';

const illustracion1 = 'https://assets.yakera.org/yakera/illustration-aboutus-1.webp'
const illustracion2 = 'https://assets.yakera.org/yakera/illustration-aboutus-2.webp'
const illustracion3 = 'https://assets.yakera.org/yakera/illustration-aboutus-3.webp'
const illustracion4 = 'https://assets.yakera.org/yakera/illustration-aboutus-4.webp'
const illustracions = [illustracion4, illustracion3, illustracion2, illustracion1]
const titleImg = 'https://assets.yakera.org/yakera/photos-aboutus.webp'
const worldImg = 'https://assets.yakera.org/yakera/worldmap.webp'


function AboutUsVisuals(props) {
    const EN = props.EN
    const language = EN?'en':'es' 

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
                            {EN ? 'Yakera unlocks international solidarity through empathy and storytelling. We revolutionize humanitarian aid, one story at a time.': 'Yakera abre las puertas a la solidaridad internacional. Cambiamos cómo se distribuye la ayuda humanitaria en el mundo, una historia a la vez.'}
                            
                        </p>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        { EN ?
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
                            :
                            <div className='about-us-top-text'>
                                <h1>Chequea nuestras <b>campañas </b> en las categorías de
                                </h1>
                                <h1 id='labels'>
                                    <a id='green' href='/campaigns'>Educación</a>,&nbsp;
                                    <a id='yellow' href='/campaigns'>Alimentación</a>,&nbsp;
                                    <a id='red' href='/campaigns'>Salud</a>&nbsp;y&nbsp;
                                    <a id='blue' href='/campaigns'>Pequeños negocios</a>.
                                </h1>
                            </div>                            
                        }
                    </Grid>                
                <Grid item xs={12} sm={12} >
                    <div className='about-us-banner'>
                        <p>{EN ? 'Read the stories written by people on the platform' : 'Lee las historias escritas por usuarios de la plataforma.'}</p>
                    </div>
                </Grid>
                
                <Grid item xs={12} sm={6} className='about-world-text' >
                    {EN ?
                        <section>
                            <div id='percent'>
                                100%
                            </div>
                            <p>
                                <b>Of what you chip in goes to people directly:</b>
                                &nbsp;no overhead costs, no fees. We are changing how humanitarian aid is delivered around the world.
                            </p>
                        </section>
                        :
                        <section>
                            <div id='percent'>
                                100%
                            </div>
                            <p>
                                <b>De lo que aportas va directamente a las personas:</b>
                                &nbsp;sin gastos generales, sin comisiones. Estamos cambiando la forma en que se entrega la ayuda humanitaria en todo el mundo.
                            </p>
                        </section>
                    }
                </Grid>
                <Grid item xs={12} sm={6} >
                    <div className='about-us-world-img'>
                        <img src={worldImg} alt='top-img' />
                    </div>
                </Grid>
                <Grid container spacing={0} style={{ alignItems:'flex-start', textAlign:'left'}}>
                {
                    content[language].map((element,i) => {
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

            <AdvisoryBoardSection EN={EN} />
        </div>
    )
}

export default AboutUsVisuals
