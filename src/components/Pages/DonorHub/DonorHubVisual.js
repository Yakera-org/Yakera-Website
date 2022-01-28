import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LanguageService from '../../../services/language';

import DonorHubBars from './DonorHubBars';

function DonorHubVisual() {

  const [language, setLanguage] = useState('');

  useEffect(() => {
    setLanguage(LanguageService.getLanguage());
  }, [])

  var EN;

  if (language === "en") {
    EN = true
  } else {
    EN = false
  }

  return (
    <div className='donorhub-container'>
      <Grid container spacing={1} style={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={12}>
          <div className='banner'>
            Banner Zone
          </div>
        </Grid>
        <Grid item xs={12} sm={12} >
          <Grid container spacing={0} className='user-info'>
            <Grid item xs={12} sm={12}>
              <div className='user-img'>
                User Img
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              <h2>Mariana Romero</h2>
            </Grid>
            <Grid item xs={12} sm={12}>
              <h6>Caracas, Venezuela</h6>
              <hr />
            </Grid>
            <Grid item xs={12} sm={12}>
              <p id='user-desc'>20, Me dedico al diseño gráfico y me encanta leer. ¡Espero poder ayudar a muchos por aqui!. Saludos a todos.</p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <p id='user-friends'><span>16 </span>{EN ? 'friends' : 'amigos'}</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={0} className='buttons-container'>
            {/* <Grid item xs={6} sm={6} className='button-1'>
          <button>About</button>
        </Grid>
        <Grid item xs={6} sm={6} className='button-2'>
          <button>Teams</button>
        </Grid> */}
            <Grid item xs={12} sm={12}>
              <hr />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={0} className='donations-info'>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={0} >
                <Grid item xs={6} sm={6} className='donation-circle'>
                  <div>
                    <div className='circle-1'>
                      <p>{EN ? "You've donated" : 'Has donado'}</p>
                      $60
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6} className='donation-circles'>
                  <div className='circle-2'>
                    $10
                  </div>
                  <div className='circle-3'>
                    $20
                  </div>
                  <div className='circle-4'>
                    $30
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={0} className='progress-bars'>
                    <Grid item xs={12} sm={12}>
                      <DonorHubBars type='#01224d' size='10%' />
                      <p className='progress-text'><span style={{ color: '#01224d' }}>$10</span> {EN ? 'have been intended to' : 'han sido destinados a'} </p>
                      <p className='progress-txt' style={{ color: '#01224d' }}>{EN ? 'Small Business' : 'Pequeños Negocios'}</p>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <DonorHubBars type='rgb(245, 151, 167)' size='20%' />
                      <p className='progress-text'><span style={{ color: 'rgb(245, 151, 167)' }}>$20</span> {EN ? 'have been intended to' : 'han sido destinados a'} </p>
                      <p className='progress-txt' style={{ color: 'rgb(245, 151, 167)' }}>{EN ? 'Medical Atention' : 'Atención Medica'}</p>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <DonorHubBars type='rgb(117, 212, 117)' size='30%' />
                      <p className='progress-text'><span style={{ color: 'rgb(117, 212, 117)' }}>$30</span> {EN ? 'have been intended to' : 'han sido destinados a'} </p>
                      <p className='progress-txt' style={{ color: 'rgb(117, 212, 117)' }}>{EN ? 'Education' : 'Educación'}</p>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={0} >
                <Grid item xs={12} sm={12} className='total-donations'>
                  <hr />
                  <h5>{EN ? 'You have donated to a total' : 'Has donado a un total de'}</h5>
                  <h4 className={EN ? 'en-txt' : 'esp-txt'}>{EN ? '7 campaigns' : '7 campañas'}</h4>
                </Grid>
                <Grid item xs={12} sm={12} >
                  <div className='campaigns-preview'>
                    <div className='campaign-circle'>
                      img
                    </div>
                    <div className='campaign-circle'>
                      img
                    </div>
                    <div className='campaign-circle'>
                      img
                    </div>
                    <div className='campaign-circle'>
                      img
                    </div>
                    <button>+</button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} className='recent-act'>
                  <h3>{EN ? 'Recent Activity' : 'Actividad reciente'}</h3>
                  <p>{EN ? 'of the campaigns to which you have donated' : 'de las campañas a las que has donado'}</p>
                  <hr />
                  <div className='recent-box'>
                    box
                  </div>
                  <div className='recent-box'>
                    box
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}

export default DonorHubVisual;