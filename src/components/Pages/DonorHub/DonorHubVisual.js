import React from 'react'; 
import { Grid } from '@material-ui/core';

function DonorHubVisual() {
  return (
    <div className='donorhubvisual-container'>
     <Grid container spacing={0}>
      <Grid item xs={12} sm={12} style={{alignItems: 'center'}}>
        DonorHub
      </Grid>
     </Grid>
    </div>
  )
}

export default DonorHubVisual;