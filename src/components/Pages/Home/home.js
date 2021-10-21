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

    const [isVisible, setIsVisible] = React.useState(false)

    const cbFunction = (entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting)
    }

    const options = React.useMemo(() => {
      return{
        root: null,
        rootMargin: '0px',
        threshold: 0.3
      }
    }, []);

    const targetRef = React.useRef(null);

    React.useEffect(() => {
      const observer = new IntersectionObserver(cbFunction, options);
      const currentTarget = targetRef.current;
      if(currentTarget) observer.observe(currentTarget);

      return () => {
        if(currentTarget) observer.unobserve(currentTarget)
      }
    }, [targetRef, options])

    

    const contactUs = () => {
        window.location.href = 'https://chat.whatsapp.com/LcSFQzsohaC1hmlgdbij3D';
    }
    
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
                <div className= {EN ? 'not-visible' : 'button'}>
                    <button onClick={contactUs} className={!isVisible ? 'contact-us-button' : 'not-visible-button'} >
                    {EN ? 'Contact Us' : 'Contáctanos'}
                    <i id='icon' className='fab fa-whatsapp'></i>
                    </button>
                </div>
                <Grid container spacing={0} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={6} >
                        <section className='top-left'>
                            <p>
                                {EN ? 'Changing how humanitarian aid is delivered around the world, one story at a time.':'Reinventando la distribución de ayuda humanitaria en el mundo, una historia a la vez.' }
                            </p>
                            <button>
                                {EN
                                ?
                                    <a href='/campaigns'>Donate Now!</a>
                                :
                                    <a href='/create-campaign'>Abre mi campaña</a>
                                }
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
                                {EN
                                ?
                                    <img src={pics["mobile-illustration_alt"]} alt='phones'/>
                                :
                                    <img src={pics["mobile-illustration"]} alt='phones'/>
                                }
                                
                            </section>
                        </Grid> 
                    </Grid>
                    <Grid container spacing={0} className='illustrations'>
                        {
                            pics.illustrations[language].map((pic, i) => {
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
                <div ref={targetRef}>
                    <Author />           
                </div>
            </div>
            
        
        </div>
    )
}

export default Home
