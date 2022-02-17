import React from 'react';
import { Grid } from '@material-ui/core';

import DonorHubBars from './DonorHubBars';

function DonorHubVisual(props) {
  const user = props.data.user
  const EN = props.EN

  function OnEdit(){
    window.location.href = "/donor-hub/edit";
  }

  return (
    <div className='donorhub-container'>
      <Grid container spacing={1} style={{ textAlign: 'center' }}>
        <Grid item xs={12} sm={12}>
          <div className='banner'>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} >
          <Grid container spacing={0} className='user-info'>
            <Grid item xs={12} sm={12}>
              <div className='user-img'>
                <img src = {user.profilePicture} alt="profile-pic" className = "profile-pic"/>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              <h2>{user.firstName} {user.lastName}
              {user.donorInfo.age
              ?
              <>, < label style={{color:"grey"}}>{user.donorInfo.age}</label></>
              :
              ""
              }
              </h2>
            </Grid>
            <Grid item xs={12} sm={12}>
              <h6>{user.donorInfo.location}</h6>
              <hr />
            </Grid>
            <Grid item xs={12} sm={12}>
              <p id='user-desc'>
                {user.donorInfo.bio
                ?
                user.donorInfo.bio
                :
                <>No Biography, add on <a style={{textDecoration:"underline"}} href="/donor-hub/edit">here</a></>
                }
              </p>
            </Grid>
            <Grid item xs={12} sm={12}>
              <button onClick={OnEdit} className='edit-btn'>Edit profile</button>
            </Grid>
          </Grid>
        </Grid>

        <hr />

        <Grid item xs={12} sm={12}>
          <Grid container spacing={0} className='donations-info'>
            <Grid item xs={12} sm={12}>
              <h2>
                Statistics
              </h2>
              <p id="sub">Analyze your impact</p>
            </Grid>
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
                  <h5 style = {{padding: '3px 0px 0px 10px'}}>{EN ? 'You have donated to a total of ' : 'Has donado a un total de '}
                  <b style = {{color: "#eb913b"}}>{EN ? '7 campaigns' : '7 campañas'}</b></h5>
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
                    <button><i className="fas fa-2x fa-plus"></i></button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} className='recent-act'>
                  <h3>{EN ? 'Recent Activity' : 'Actividad reciente'}</h3>
                  <p>{EN ? 'Your recent donations' : 'de las campañas a las que has donado'}</p>
                  <hr />
                  <div className='recent-box'>
                    
                  </div>
                  <div className='recent-box'>
                    
                  </div>
                  <div className='recent-box'>
                    
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
