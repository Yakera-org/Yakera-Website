import React from 'react';
import "./Reserve.css"
import { Grid, Button } from '@material-ui/core'
import ellipse from '../../../pics/ellipse.png'


function ReserveVisual(props) {

    const EN = props.EN;

    return (
        <div>
            
            {EN ?
                <p id="reserve-top">Amount to be donated via Reserve: ${props.amount} </p>
            :
                <p id="reserve-top">Monto a donar via Reserve: ${props.amount} </p>
            }
            {EN ?
                <p id="reserve-des">These are the steps to donate:</p>
            :
                <p id="reserve-des">Sigue estos pasos para realizar tu donación</p>
            }
            <Grid container spacing={0} className='steps'>
                <Grid item sm={4}>
                    <img id='steps' src={ellipse} alt='steps' />
                </Grid>
                <Grid item sm={4}>
                    <img id='steps' src={ellipse} alt='steps' />
                </Grid> 
                <Grid item sm={4}>
                    <img id='steps' src={ellipse} alt='steps' />
                </Grid>
                <Grid item sm={4}>
                    <div id='text'>Text</div>
                </Grid>
                <Grid item sm={4}>
                    <div id='text'>Text</div>
                </Grid>
                <Grid item sm={4}>
                    <div id='text'>Text</div>
                </Grid>
            </Grid>
            {EN ?
                <p id="username-text">Enter your Reserve username</p>
            :
                <p id="username-text">Ingresa tu usuario de Reserve</p>
            }
            <div className = "input-container">
                <input
                    type="text"
                    name="Username"
                    className='input-field'
                    placeholder={EN ? "Username here" : "Usuario de Reserve aquí"}
                />
            </div>
            <br />
            <Button className='confirm-button'
                style={{
                    border:'none',
                    backgroundColor:'black',
                    borderRadius:'10px',
                    color:'white',
                    padding:'10px',
                    maxWidth:'15vw',
                    minWidth:'8vw',
                    fontSize:'13px'
                }}
            >{EN ? "Confirm Payment" : "Confirmar Pago"}</Button>
        </div>
    );
}

export default ReserveVisual;