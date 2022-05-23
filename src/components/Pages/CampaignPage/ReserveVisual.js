import React from 'react';
import "./Reserve.css"
import { Grid, Button, CardMedia, Hidden} from '@material-ui/core'
import classnames from 'classnames';
import reservebar from '../../../pics/reserve-bar.svg';
import reserveBarVert from '../../../pics/reserve-step-vert.svg';

function ReserveVisual(props) {

    const EN = props.EN;
    const data = props.data;

    return (
        <div>
            
            {EN ?
                <p id="reserve-top">Amount to be donated via Reserve: ${props.amount} </p>
            :
                <p id="reserve-top">Monto a donar via Reserve: ${props.amount} </p>
            }
            <br/>
            {EN ?
                <p id="reserve-des">These are the steps to donate:</p>
            :
                <p id="reserve-des">Sigue estos pasos para realizar tu donación</p>
            }
            <Hidden xsDown>
            <Grid container spacing={0} className='steps'>
                <Grid item xs={0} sm={12}>
                    <CardMedia className='reserve-steps-card' component="img" image={reservebar}
                        alt='steps-bar' style={{ maxWidth: "100%", float: "center", marginLeft: "-3.8%" }} 
                    />
                    <div className='steps-num'>
                        <span id='first'>1</span>
                        <span id='second'>2</span>
                        <span id='third'>3</span>
                    </div>
                </Grid>
                <Grid container spacing={4} className='reserve-steps-text'>
                    <Grid item sm={4}>
                        <div id='text'>
                        {EN
                        ?
                        "Go to the Reserve application and transfer the amount shown above to"
                        :
                        "Ve a la aplicación de Reserve y transfiere el monto indicado a"
                        }
                        <br />
                        <span class="bold"><span role="img" aria-label='fly-dollar'>💸yakera</span></span>
                        </div>
                        <br />
                    </Grid>
                    <Grid item sm={4}>
                        <div id='text'>
                        {EN 
                        ? 
                        "After you have transferred, enter your username in the box below" 
                        : 
                        "Después de que hayas hecho la transferencia, introduce tu usuario en la casilla de abajo"
                        }
                        </div>
                        <br />
                    </Grid>
                    <Grid item sm={4}>
                        <div id='text-third'>
                        {EN 
                        ? 
                        "click on the confirm transaction button and ... that's all!" 
                        : 
                        "Haz click en el botón de confirmación yiYa está todo listo"
                        }
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            </Hidden>
            {/* for mobile view */}
            <Hidden smUp>
            <Grid container direction='row' className='steps'>
                    <Grid item xs={2}>
                        <CardMedia className='reserve-steps-card' component="img" image={reserveBarVert}
                            alt='steps-bar' style={{ maxWidth: "80%", float: "center", marginLeft: "30%" }} 
                        />
                        <div className='steps-num'>
                            <span id='first'>1</span>
                            <span id='second'>2</span>
                            <span id='third'>3</span>
                        </div>
                    </Grid>
                    <Grid container direction='row' spacing={3} xs={10}>
                        <Grid item xs={10}>
                            <div id='text-first'>
                            {EN
                            ?
                            "Go to the Reserve application and transfer the amount shown above to yakera"
                            :
                            "Ve a la aplicación de Reserve y transfiere el monto indicado a yakera"
                            }
                            </div>
                        </Grid>
                        <Grid item xs={10}>
                            <div id='text-second'>
                            {EN 
                            ? 
                            "After you have transferred, enter your username in the box below" 
                            : 
                            "Después de que hayas hecho la transferencia, introduce tu usuario en la casilla de abajo"
                            }
                            </div>
                        </Grid>
                        <Grid item xs={10}>
                            <div id='text-third'>
                            {EN 
                            ? 
                            "click on the confirm transaction button and ... that's all!" 
                            : 
                            "Haz click en el botón de confirmación yiYa está todo listo"
                            }
                            </div>
                        </Grid>
                    </Grid>
            </Grid>
            </Hidden>
            <Grid container className='input-grid'>
                <Grid item xs={12} className='text-container'>
                    {EN ?
                    <p id="username-text">Enter your Reserve username</p>
                    :
                    <p id="username-text">Ingresa tu usuario de Reserve</p>
                    }
                </Grid>
                <Grid item xs={12} className='input-container'>
                    <div>
                    <input id='input-field'
                        type="text"
                        name="username"
                        placeholder={EN ? "Username here" : "Usuario de Reserve aquí"}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            { 'is-valid': data.errors.username === false},
                            { 'is-invalid': data.errors.username},
                            'input-field'
                        )}
                    />
                    <div className='invalid-feedback'>{data.errors.username}</div>
                    </div>
                </Grid>
                <Hidden xsDown>
                <Grid item xs={12} className='confirm-container'>
                    <Button className='confirm-button'
                        onClick={props.onConfirm}
                        style={{ backgroundColor: '#70B88F', 
                                    color: 'white', 
                                    fontSize: '0.8em',
                                    textTransform: 'none',
                                    borderRadius: '10px',
                                    maxWidth: '20vw',
                                    fontFamily:'Intro-Book-Alt',
                                    fontWeight: '800',
                                    marginTop: '-10%'}}
                        >{EN ? "Confirm Transaction" : "Confirm Transaction"}
                    </Button>
                </Grid>
                </Hidden>
                <Hidden smUp>
                <Grid item xs={12} className='confirm-container'>
                    <Button className='confirm-button'
                        onClick={props.onConfirm}
                        style={{ backgroundColor: '#70B88F', 
                                    color: 'white', 
                                    fontSize: '0.5em',
                                    textTransform: 'none',
                                    borderRadius: '10px',
                                    maxWidth: '30vw',
                                    maxHeight: '4vw',
                                    fontFamily:'Intro-Book-Alt',
                                    marginBottom: '10%',
                                    fontWeight: '600'}}
                        >{EN ? "Confirm Transaction" : "Confirm Transaction"}
                    </Button>
                </Grid>
                </Hidden>
            </Grid>
        </div>
    );
}

export default ReserveVisual;