import React, {useState, useEffect} from 'react';
import { Grid } from '@material-ui/core';

import DonorHubBars from './DonorHubBars';

const colorDic = {
  "education": 'rgb(117, 212, 117)',
  "healthcare": 'rgb(245, 151, 167)',
  "small_business":'#01224d',
  "nutrition": '#f7bc55',
};


const nameDictEN = {
  "education": "Education",
  "healthcare": "Healthcare",
  "small_business":"Small Business",
  "nutrition": "Nutrition"
};
const nameDictSP = {
  "education":"Educación",
  "healthcare":"Atención Médica",
  "nutrition":"Nutrición",
  "small_business":"Pequeños Negocios"
};


function DonorHubVisual(props) {
  const user = props.data.user
  const donations = props.data.donations
  const EN = props.EN

  const [total, setTotal] = useState(0);
  const [totalHealth, setHealth] = useState(0);
  const [totalBusiness, setBusiness] = useState(0);
  const [totalFood, setFood] = useState(0);
  const [totalEducation, setEducation] = useState(0);

  useEffect(() => {
    const startup = () => {
      donations.forEach(d => {
        setTotal(total => total + d.amount)
        switch(d.category){
          case "healthcare":
            setHealth(totalHealth => totalHealth + d.amount)
          break
          case "small_business":
            setBusiness(totalBusiness => totalBusiness + d.amount)
          break
          case "nutrition":
            setFood( totalFood => totalFood + d.amount)
          break
          case "education":
            setEducation(totalEducation => totalEducation + d.amount)
          break

          default:
            break
        }
      });
    }  
    startup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function OnEdit(){
    window.location.href = "/donor-hub/edit";
  }

  function getCatAmount(cat){
    switch(cat){
      case "healthcare":
        return totalHealth
      case "small_business":
        return totalBusiness
      case "nutrition":
        return totalFood
      case "education":
        return totalEducation

      default:
        break
    }
  }

  function getRelativeAmount(cat){
    if(getCatAmount(cat) === 0)return 1

    var max = Math.max(totalBusiness, totalHealth, totalEducation, totalFood);

    return(
      75 * getCatAmount(cat) / max 
    )
  }

  return (
    <div className='donorhub-container' style={{paddingBottom: "150px"}}>
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
              <h2 id='sub'>
                {EN ? 'Track your impact' : 'Tu impacto'}
              </h2>
              {/* <p id="sub">Analyze your impact</p> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={0} >
                <Grid item xs={6} sm={6} className='donation-circle'>
                  <div>
                    <div className='circle-1'>
                      <p>{EN ? "You've donated" : 'Has donado'}</p>
                      ${total}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6} sm={6} className='donation-circles'>
                  <div className='circle-2'>
                    ${totalBusiness}
                  </div>
                  <div className='circle-3'>
                    ${totalHealth}
                  </div>
                  <div className='circle-4'>
                    ${totalEducation}
                  </div>
                  <div className='circle-5'>
                    ${totalFood}
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={0} className='progress-bars'>
                    {
                    ["small_business", "education", "healthcare", "nutrition"].map((cat, i) => {
                      return(
                        <Grid item xs={12} sm={12} key={i}>
                          <DonorHubBars type={colorDic[cat]} size={getRelativeAmount(cat) + '%'} />
                          <p className='progress-text'><span style={{ color: colorDic[cat] }}>${getCatAmount(cat)} </span>
                            {EN ? 'for' : 'por'} 
                          </p>
                          <p className='progress-txt' style={{ color: colorDic[cat] }}>
                            {EN ? nameDictEN[cat] : nameDictSP[cat]}
                          </p>
                        </Grid>
                      )
                    })
                    }                   
                    
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={0} >
                <Grid item xs={12} sm={12} className='total-donations'>
                  <hr />
                  <h5 style = {{padding: '3px 0px 0px 10px'}}>
                    {EN ? 
                    'You have helped fund a total of ' : 'Has donado a un total de '}
                      <b style = {{color: "#eb913b"}}>
                        {EN ? 
                        donations.length > 1 ? donations.length + ' campaigns' : donations.length + ' campaign'
                        :
                        donations.length > 1 ? donations.length + ' campañas' : donations.length + ' campaña'}
                      </b>
                  </h5>
                </Grid>
                <Grid item xs={12} sm={12} className='campaigns-preview' >
                  <Grid container spacing={0} style={{ textAlign: 'center' }} >
                    {
                      donations.map((donation, i) => {
                        return(
                            <Grid key={i} item xs={2} sm={1}>
                              <div style={{backgroundColor:colorDic[donation.category]}}  className='campaign-circle'>
                              
                              </div>
                            </Grid>
                        )
                      })
                    }
                  <button onClick={() => window.location = '/campaigns'}><i className="fas fa-2x fa-plus"></i></button>
                  </Grid> 
                   
                  
                </Grid>
                <Grid item xs={12} sm={12} className='recent-act'>
                  <h3>{EN ? 'Your recent contributions' : 'Contribuciones recientes'}</h3>
                  {/* <p>{EN ? 'Your recent donations' : 'de las campañas a las que has donado'}</p> */}
                  <hr />
                  {
                      donations.reverse().map((donation, i) => {
                        if(i<3){
                          return(
                            <div key={i} className='recent-box' style={{borderColor:colorDic[donation.category]}}>
                              <p>
                                Donation of <b id="amount">{donation.amount}$</b>
                              </p>
                              <p>
                                To the campaign: <i>{donation.title}</i>
                                <br />  

                              {donation.comment
                              ? <b>"{donation.comment}"</b>
                              :
                              ""}
                              </p>                              
                              <a href={`/campaign/${donation.slug}`}>Go to campaign</a>
                            </div>
                          )
                        }else{
                          return ""
                        }
                      })
                    }                 
                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          

          <Grid container spacing={0} className='increase-impact'>
            <Grid item xs={12} sm={12}>
              <h3>
                {EN ? 'Increase your impact' : 'Continúa tu impacto'}
              </h3>
            </Grid>
            <Grid item xs={12} sm={12}>
              <a href='/campaigns'>
                {EN ? 'Fund more dreams' : 'Ayuda a más personas'}
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}

export default DonorHubVisual;
