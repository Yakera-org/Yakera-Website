import React from 'react'
import {pics} from './picsHome.js';
import Zoom from 'react-reveal/Zoom';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { Grid } from '@material-ui/core';

import './home.css';

function Home() {
    return (
        <div>
            <div className='home-page'>

                 <Parallax   x={[-250, 0 ]}>
                    <img src={pics.Y} alt='Y' style={{float:'left',marginTop:'10%', marginLeft:'30%', width:'10%'}}/>
                </Parallax>
                <div style={{textAlign:'center'}}>
                    <img src={pics.akera} alt='akea' style={{marginTop:'10%', width:'30%', marginLeft:'-30%'}}/>
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
                        marginTop:'150px',
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
                
                

                {/* <div style={{width:'50%', marginLeft:'25%', textAlign:'center'}}>
                    <Grid container spacing={1} style={{alignContent:'center', alignItems:'flex-start'}}>
                    {['Y','A','K','E','R','A'].map(function(X, i){
                        return (
                        <Grid item xs={12} sm={2} >
                            <Parallax  y={[- getOffset(i), getOffset(i) ]}>
                                <h1 style={{color:'#ea8737'}}>{X}</h1>
                            </Parallax>        
                        </Grid>
                        );
                    })}
                    </Grid>                        
                </div> */}

                {/* <ParallaxBanner
                    layers={[
                        {
                            image: pics.pattern,
                            amount: 2,
                        }
                    ]}
                    style={{
                        height: '50px',
                        marginTop:'150px',
                        width:'100%'
                    }}
                >
                </ParallaxBanner>

                <Parallax   x={[0, -100 ]}>
                    <img src={pics.illustracion} alt='ill' style={{float:'right', marginRight:'-100%'}}/>
                </Parallax>

                <ParallaxBanner
                    layers={[
                        {
                            image: pics.phones,
                            amount: 0.5,
                        }
                    ]}
                    style={{
                        height: '500px',
                        marginTop:'200px',
                        width:'50%'
                    }}
                >
                </ParallaxBanner>
                <ParallaxBanner
                    layers={[
                        {
                            image: pics.pattern,
                            amount: 1,
                        }
                    ]}
                    style={{
                        height: '50px',
                        marginTop:'20px',
                        width:'100%'
                    }}
                >
                </ParallaxBanner> */}
            </div>

        </div>
    )
}

export default Home
