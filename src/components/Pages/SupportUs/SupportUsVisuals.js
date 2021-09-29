import React from 'react'
import { Grid } from '@material-ui/core';

const titleImg =  'https://assets.yakera.org/yakera/nuevopost-12.jpg';
const banner1 = 'https://assets.yakera.org/yakera/Ivana+Duran.jpeg'
const banner2 = 'https://assets.yakera.org/yakera/support.png'

function SupportUsVisuals(props) {
    const EN = props.EN
    function bringToDonate(event){
        let amount = event.target.name;
        amount = amount.substring(1, amount.length);
        amount = parseInt(amount)
        props.setAmount(amount)
        let element = document.getElementById('donateRef');
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    return (
        <div>
            <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} sm={6} >
                    <div className='support-us-top-left'>
                        <img src={titleImg} alt='support-us-img' />
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <div className='support-us-top-right'>
                        <h1>{EN ? 'Changing how humanitarian aid is delivered around the world' : 'Cambiando la forma en que se distribuye la ayuda humanitaria en todo el mundo'}</h1>
                        <div className='donate-box'>
                            <p>{EN ? 'Choose an amount to donate' : 'Elija una cantidad para donar'} </p>
                            <div className='inside-box'>
                                <Grid container spacing={2} style={{ alignItems:'flex-start'}}>
                                    {['$20', '$50', '$100', '$150'].map((amount, i) => {
                                        return(
                                            <Grid item xs={6} sm={4} key={i}>
                                                <button name={amount} onClick={bringToDonate} className='amount-box'>
                                                {amount}
                                                </button>
                                            </Grid>
                                        )
                                    })
                                    }
                                    <Grid item xs={12} sm={8} >
                                        <button onClick={bringToDonate}  className='amount-box'>
                                            {EN ? 'Other Amount' : 'Otra cantidad'}
                                        </button>
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
                                        <div className='donate-btn'>
                                            <button onClick={bringToDonate}  >
                                            {EN ? 'Donate Now!' : '¡Done ahora!'}
                                            </button>
                                        </div>
                                    </Grid>
                                </Grid>

                                
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <br />

            <Grid container spacing={0} alignItems="center">
                <Grid item xs={12} sm={6} >
                    <div className='support-us-content-left'>
                        <div>
                            <img src={banner1} alt='img-banner' />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} >
                    {EN ?
                     <div className='support-us-content-right'>
                        <div>
                            <h1>Yakera is a community that embraces innovation, empathy, and individual agency to revolutionize development and humanitarian aid.</h1>
                            <h1><b>Join us in changing the world, one story at a time.</b></h1>
                        </div>
                    </div>
                    :
                    <div className='support-us-content-right'>
                        <div>
                            <h1>Yakera es una comunidad que abraza la innovación, la empatía y la agencia individual para revolucionar el desarrollo y la ayuda humanitaria.</h1>
                            <h1><b>Únase a nosotros para cambiar el mundo, una historia a la vez.</b></h1>
                        </div>
                    </div>
                    }
                   
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className='support-us-content-right'>
                        {EN ?
                            <div>
                                <h1>
                                You can make a difference. Your direct donation to Yakera allows us to develop our technology and serve our communities.
                                </h1>
                                <h1><b>We are change multipliers.</b> </h1>
                            </div>
                            :
                            <div>
                                <h1>
                                Tú puedes hacer la diferencia. Su donación directa a Yakera nos permite desarrollar nuestra tecnología y servir a nuestras comunidades.
                                </h1>
                                <h1><b>Somos multiplicadores del cambio.</b> </h1>
                            </div>
                        }
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className='support-us-content-left'>
                        <div>
                            <img src={banner2} alt='img-banner' />
                        </div>
                    </div>
                </Grid>
               
            </Grid>
        </div>
    )
}

export default SupportUsVisuals