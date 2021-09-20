import React from 'react'
import pics from './picsHome.json';
import ReactPlayer from 'react-player'
import { Grid } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Author from '../../author';
import './home.scss';

//for carousel 
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

function Home() {
    React.useEffect(() =>{
        localStorage.setItem('dic', null) 
    }, [])
    return (
        <div>
            <div className='home-page'>
                <Grid container spacing={0} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={6} >
                        <section className='top-left'>
                            <p>
                                Reinventando la distribución de ayuda humanitaria en el mundo, una historia a la vez.
                            </p>
                            <button>
                                <a href='/about'>Mas info</a>
                            </button>
                        </section>
                    </Grid> 
                    <Grid item xs={12} sm={6} >
                        <section className='top-right'>
                            <img src={pics.phones} alt='phones'/>
                        </section>
                    </Grid> 
                    <Grid container spacing={0} className='illustrations'>
                        {
                            pics.illustrations.map(pic => {
                                return(
                                    <Grid item xs={12} sm={3} >
                                        <img id='illustration' src={pic} alt='illustration'/>
                                    </Grid> 
                                )                            
                            })
                        }
                        <Grid item xs={12} sm={12} >
                            <img id='dotted-line' src={pics['dotted-line']} alt='illustration'/>
                        </Grid> 
                        {
                            pics['illustration-texts'].map(text => {
                                return(
                                    <Grid item xs={12} sm={3} >
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
                                    El 100% de las donaciones te llegarán de manera rápida y segura.
                                </h3>
                                <p>
                                    A través de una experiencia en realidad virtual, conocerás a Alexandra de El Calvario, Venezuela. En 360 grados, entérate de como Alexandra utilizó Yakera para recaudar el dinero necesario para cumplir su sueño: acceder a una educación de calidad.
                                </p>
                            </section>
                        </Grid>   
                    </Grid> 

                    <Grid container spacing={0} className='carousel-section'>                    
                        <Grid item xs={12} sm={12} >
                            <h1>
                                Extiende una mano
                            </h1>                           
                        </Grid>  
                        <Grid item xs={12} sm={12} >                            
                            <Carousel
                                swipeable={true}
                                draggable={true}
                                showDots={false}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={2000}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={''}
                                deviceType={"mobile"}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                            >    
                                <div>item1</div>
                            </Carousel>             
                        </Grid>  
                    </Grid>
                </Grid> 
            
            </div>
            
        
        </div>
    )
}

export default Home
