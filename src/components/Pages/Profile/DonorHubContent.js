import React from 'react';
import { Grid } from '@material-ui/core';
import * as dictionaries from "./dictionaries";
const donorCTA = 'https://assets.yakera.org/yakera/donor-cta.svg';

function DonorHubContent(props) {
    const EN = props.EN
    const donations = props.data.donations || []

    const [total, setTotal] = React.useState(0);
    const [totalHealth, setHealth] = React.useState(0);
    const [totalBusiness, setBusiness] = React.useState(0);
    const [totalFood, setFood] = React.useState(0);
    const [totalEducation, setEducation] = React.useState(0);
  
    React.useEffect(() => {
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

        return( 75 * getCatAmount(cat) / max )
    }

    return (
        
        <Grid container spacing={1} style={{ textAlign: 'center'}}>
      
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
                  <div className='circle-1'>
                    <div className='circle-1-inside' >
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
                          <DonorHubBars type={dictionaries.colorDic[cat]} size={getRelativeAmount(cat) + '%'} />
                          <p className='progress-text'>
                            <span style={{ color: dictionaries.colorDic[cat], fontWeight: '900' }}>${getCatAmount(cat)} </span>
                            {EN ? 'for' : 'por'} 
                          </p>
                          <p className='progress-txt' style={{ color: dictionaries.colorDic[cat], fontWeight: '900'}}>
                            {EN ? dictionaries.nameDictEN[cat] : dictionaries.nameDictSP[cat]}
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
                      <span style = {{color: "#eb913b"}}>
                        {EN ? 
                        donations.length > 1 ||  donations.length === 0 ? donations.length + ' campaigns' : donations.length + ' campaign'
                        :
                        donations.length > 1 ||  donations.length === 0 ? donations.length + ' campañas' : donations.length + ' campaña'}
                      </span>
                  </h5>
                </Grid>
                <Grid item xs={12} sm={12} className='campaigns-preview' >
                  <Grid container spacing={6} style={{ textAlign: 'center' }} >
                    {
                      donations.map((donation, i) => {
                        let mobileCondition = window.innerWidth < 1000 ? 20 : 100
                        if(i< mobileCondition){
                          return(
                              <Grid key={i} item xs={2} sm={1}>
                                <div style={{backgroundColor:dictionaries.colorDic[donation.category]}}  className='campaign-circle'>
                                
                                </div>
                              </Grid>
                          )
                        }else{
                          return ""
                        }

                      })
                    }
                  <Grid item xs={2} sm={1}>
                    <button onClick={() => window.location = '/campaigns'}><i className="fas fa-2x fa-plus"></i></button>
                  </Grid>
                  
                  </Grid> 
                   
                  
                </Grid>
                <Grid item xs={12} sm={12} className='recent-act'>
                  <h3>{EN ? 'Your recent contributions' : 'Contribuciones recientes'}</h3>
                  <hr />
                  {
                    donations.length === 0 
                    ?
                      <p style={{padding:"10px"}}>{EN ? "Make your first donation!" : '¡Haz tu primera donación!'}</p>
                    :
                    ""
                  }
                  {
                      donations.slice(-3).map((donation, i) => {
                        return(
                          <div key={i} className='recent-box'>
                            <Grid container spacing={0} style={{ textAlign: 'center' }} >
                              <Grid item xs={3} sm={3} >
                                <div className='image-circle' >
                                    <img src={donation.mainPicture ? donation.mainPicture.url : "https://assets.yakera.org/yakera/y.png"} alt="recent-cam-pic" style={{border:"7px " + dictionaries.colorDicImageCircle[donation.category] + " solid"}}/>
                                </div>

                              </Grid>
                              <Grid item xs={9} sm={9} >
                                <div className='update'>
                                  <div id="title">
                                    {EN
                                      ? <>
                                        <b id="amount">${donation.amount}</b> Donation
                                      </>
                                      : <>
                                        Donación de <b id='amount'>${donation.amount}</b>
                                      </>
                                    }
                                  </div>
                                  <p>
                                    {EN ? "To the campaign: " : "A la campaña: "}
                                      <i>{donation.title}</i>
                                    <br />  

                                    </p>                              
                                  {donation.comment
                                  ? <div id="comment">"{donation.comment}"</div>
                                  :
                                  ""}
                                  <a href={`/campaign/${donation.slug}`}>{EN ? "Go to campaign →" : "Ir a la campaña →"}</a>
                                </div>
                              </Grid>
                            </Grid>
                          </div>
                        )
                      })
                    }

                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                className='increase-impact'
              >
                <Grid item xs={3} sm={3}  >
                  <img src={donorCTA} alt="increase-impact" style={{height: window.innerWidth < 1000 ? '100px' : '100%'}}/>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <h4>
                    {EN ? "Keep changing people's lives!" : '¡Sigue cambiando la vida de más personas!'}
                  </h4>
                  <button onClick={() => window.location = '/campaigns'}>
                    {EN ? 'Fund more dreams' : 'Apoya más campañas aquí'}
                  </button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>


        </Grid>
      </Grid>
    );
}

export default DonorHubContent;

function DonorHubBars(props) {

    return (
      <div className='donor-progress'>
        <div className='donation-progress' ></div>
        <div className='progress-bar' style={{ backgroundColor: props.type, width: props.size }}></div>
      </div >
    )
  }