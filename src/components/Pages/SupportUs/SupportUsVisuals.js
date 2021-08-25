import React from 'react'
import { Grid } from '@material-ui/core';
import titleImg from '../../../pics/y.png'

function SupportUsVisuals() {
    return (
        <div style={{padding:'20px'}}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={5} >
                    <div className='support-us-top-left'>
                        <img src={titleImg} alt='support-us-img' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={7} >
                    <div className='support-us-top-right'>
                        <h1>Changing how humanitarian aid is delivered around the world</h1>
                        <div className='donate-box'>
                            <p>Choose an amount to donate </p>
                            <div className='inside-box'>
                                <Grid container spacing={2} style={{ alignItems:'flex-start'}}>
                                    <Grid item xs={12} sm={4} >
                                        <button className='amount-box'>
                                           $20
                                        </button>
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <button className='amount-box'>
                                           $50
                                        </button>
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <button className='amount-box'>
                                           $100
                                        </button>
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <button className='amount-box'>
                                           $150
                                        </button>
                                    </Grid>
                                    <Grid item xs={12} sm={8} >
                                        <button className='amount-box'>
                                           Other Amount
                                        </button>
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <div className='donate-btn'>
                                            <button >
                                                Donate Now!
                                            </button>
                                        </div>
                                    </Grid>
                                </Grid>

                                
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default SupportUsVisuals
