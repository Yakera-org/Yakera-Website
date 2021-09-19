import React from 'react'
import pics from './picsHome.json';
import Zoom from 'react-reveal/Zoom';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { Grid } from '@material-ui/core';
import Author from '../../author';

import './home.scss';

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
                        

                    </Grid> 
                </Grid> 
            
            </div>
            
        
        </div>
    )
}

export default Home
