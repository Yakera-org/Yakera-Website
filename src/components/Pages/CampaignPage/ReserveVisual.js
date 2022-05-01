import React from 'react';
import "./Reserve.css"
import { Grid, Button, CardMedia, Hidden} from '@material-ui/core'
import reservebar from '../../../pics/reserve-bar.svg'


function ReserveVisual(props) {

    const EN = props.EN;

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
            <Grid container spacing={0} className='steps'>
                <Hidden xsDown>
                <Grid item sm={12}>
                    <CardMedia className='reserve-steps-card' component="img" image={reservebar}
                        alt='steps-bar' style={{ maxWidth: "90%", float: "center" }} 
                    />
                    <div className='steps-num'>
                        <span id='first'>1</span>
                        <span id='second'>2</span>
                        <span id='third'>3</span>
                    </div>
                </Grid>
                </Hidden>
                <Grid container spacing={0} className='reserve-steps-text'>
                    <Grid item xs={12} sm={4}>
                        <div id='text'>
                        {EN
                        ?
                        "Go to the Reserve application and transfer the amount shown above to"
                        :
                        "Ve a la aplicación de Reserve y transfiere el monto indicado a"
                        }
                        </div>
                        <span class="bold"><span class="money-emoji">💸</span>yakera</span>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div id='text'>
                        {EN 
                        ? 
                        "After you have transferred, enter your username in the box below" 
                        : 
                        "Después de que hayas hecho la transferencia, introduce tu usuario en la casilla de abajo"
                        }
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div id='text'>
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
            <br />
            {EN ?
                <p id="username-text">Enter your Reserve username</p>
            :
                <p id="username-text">Ingresa tu usuario de Reserve</p>
            }
            <div className = "input-container">
                <input className='input-field'
                    type="text"
                    name="username"
                    placeholder={EN ? "Username here" : "Usuario de Reserve aquí"}
                    onChange={props.handleChange}
                />
            </div>
            <br />
            <Button className='confirm-button'
                style={{
                    border:'none',
                    backgroundColor:'black',
                    borderRadius:'15px',
                    color:'white',
                    padding:'10px',
                    maxHeight:'2vw',
                    maxWidth:'10vw',
                    fontSize:'50%',
                    textTransform: 'none'
                }}
            >{EN ? "Confirm transaction" : "Confirm Transaction"}</Button>
        </div>
    );
}

export default ReserveVisual;