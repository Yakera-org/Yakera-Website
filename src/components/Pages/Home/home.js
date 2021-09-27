import React from 'react'
import pics from './picsHome.json';
import ReactPlayer from 'react-player'
import { Grid } from '@material-ui/core';
import 'react-multi-carousel/lib/styles.css';
import Author from '../../author';
import CampaignCarousel from './CampaignCarousel';
import LanguageService from '../../../services/language';
import './home.scss';

function Home() {
    const [EN, setEN] = React.useState(false);
    const [language, setLanguage] = React.useState('en');

    React.useEffect(() => {
        if(LanguageService.getLanguage()==='en'){
            setEN(true)
            setLanguage('en')
        }
        else{
            setEN(false)
            setLanguage('es')
        } 
    }, []);

    return (
        <div>
            <div className='home-page'>
                <Grid container spacing={0} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={6} >
                        <section className='top-left'>
                            <p>
                                {EN ? 'Reinventing the distribution of humanitarian aid around the world, one story at a time. ':'Reinventando la distribución de ayuda humanitaria en el mundo, una historia a la vez.' }
                            </p>
                            <button>
                                <a href='/about'>{EN ? 'More info' : 'Mas info'}</a>
                            </button>
                        </section>
                    </Grid> 
                    <Grid item xs={12} sm={6} >
                        <section className='top-right'>
                            <img src={pics.phones} alt='phones'/>
                        </section>
                    </Grid> 
                    <Grid container spacing={0} className='illustrations-mobile'>
                        <Grid item xs={12} sm={12} >
                            <section>
                                <img src={pics["mobile-illustration"]} alt='phones'/>
                            </section>
                        </Grid> 
                    </Grid>
                    <Grid container spacing={0} className='illustrations'>
                        {
                            pics.illustrations.map((pic, i) => {
                                return(
                                    <Grid item xs={12} sm={3} key={i}>
                                        <img id='illustration' src={pic} alt='illustration' />
                                    </Grid> 
                                )                            
                            })
                        }
                        <Grid item xs={12} sm={12} >
                            <img id='dotted-line' src={pics['dotted-line']} alt='illustration'/>
                        </Grid> 
                        {
                            pics['illustration-texts'][language].map((text, i) => {
                                return(
                                    <Grid item xs={12} sm={3} key={i}>
                                       <div id='text' dangerouslySetInnerHTML={{__html:text }}></div>
                                    </Grid> 
                                )                            
                            })
                        }

                    </Grid> 
                    <Grid container spacing={0} className='video-section'> 
                        <Grid item xs={12} sm={7} >
                            <section>
                                <ReactPlayer
                                    url="https://www.youtube.com/watch?v=nIvkQys-QrM"
                                    width="100%"
                                    height="500px"
                                    playing
                                    playIcon={
                                    <button id='play-btn'>
                                        <i className="far fa-play-circle fa-8x"></i>
                                    </button>
                                    }
                                    light={pics['video-img']}
                                />
                            </section>
                        </Grid>  
                        <Grid item xs={12} sm={5} className='right-section' >
                            <section>
                                <h3>
                                    {EN? '100% of the donations will reach you quickly and safely.' : 'El 100% de las donaciones te llegarán de manera rápida y segura.'}
                                </h3>
                                <p>
                                    {EN ? 'Through a virtual reality experience, you will meet Alexandra from El Calvario, Venezuela. In 360 degrees, find out how Alexandra used Yakera to raise the money necessary to fulfill her dream: to access a quality education.' :'A través de una experiencia en realidad virtual, conocerás a Alexandra de El Calvario, Venezuela. En 360 grados, entérate de como Alexandra utilizó Yakera para recaudar el dinero necesario para cumplir su sueño: acceder a una educación de calidad.'}
                                </p>
                            </section>
                        </Grid>   
                        </Grid> 
                    <Grid container spacing={0} className='carousel-section'>       
                        <CampaignCarousel EN={EN}/>
                    </Grid> 
                </Grid> 
            <Author />
            </div>
            
        
        </div>
    )
}

export default Home
