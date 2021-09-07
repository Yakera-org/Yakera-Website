import React from 'react'
import {pics} from './picsHome.js';
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

                 <Parallax   x={[-240, 0 ]}>
                    <img src={pics.Y} alt='Y' id='Y'/>
                </Parallax>
                <div style={{textAlign:'center'}}>
                    <img src={pics.akera} alt='akera' id='akera'/>
                </div>

                <div className="container">
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                    <div className="chevron"></div>
                </div>

                <ParallaxBanner
                    layers={[
                        {
                            image: pics.pattern,
                            amount: 2,
                        }
                    ]}
                    style={{
                        height: '50px',
                        minHeight:'50px',
                        marginTop:'100px',
                        width:'100%'
                    }}
                >
                </ParallaxBanner>
                <br />
                <br />
                <br />
                <Grid container spacing={1} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={6} >
                        <ParallaxBanner
                            layers={[
                                {
                                    image: pics.phones,
                                    amount: 0.2,
                                }
                            ]}
                        >
                        </ParallaxBanner>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <Zoom top>
                            <div className='home-right'>
                                <p>Changing how humanitarian aid is delivered around the world.</p>  
                                <a href='/info'>
                                    <button>More info</button>
                                    
                                </a>    
                            
                            </div>
                        </Zoom>

                    </Grid>  
                </Grid>   

                <ParallaxBanner
                    layers={[
                        {
                            image: pics.pattern,
                            amount: 2,
                        }
                    ]}
                    style={{
                        height: '50px',
                        marginTop:'50px',
                        width:'100%'
                    }}
                >
                </ParallaxBanner>
                    <br />
                    <br />
                    <br />
                <Grid container spacing={1} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={6} >
                        <Zoom top>
                            <div className='home-right'>
                                <p>Help us achieve our mission.</p>  
                                <a href='/donate'>
                                    <button>Support</button>
                                    
                                </a>    
                            
                            </div>
                        </Zoom>

                    </Grid>  
                    <Grid item xs={12} sm={6} >
                        <ParallaxBanner
                            layers={[
                                {
                                    image: pics.illustracion,
                                    amount: 0.2,
                                }
                            ]}
                        >
                        </ParallaxBanner>
                    </Grid>
                </Grid> 
            
            </div>
            
        <Author />
        </div>
    )
}

export default Home
