import React from 'react';
import { Grid, Checkbox } from '@material-ui/core';

const questionmarkSVG = "https://assets.yakera.org/yakera/icon-questionmark.svg";

function RecipientOnly(props) {
    const EN = props.EN
    const user = props.user
    const fieldPlaceHolders = props.fieldPlaceHolders
    const fieldDict = props.fieldDict
    return (
        <>
            <Grid item xs={12} sm={6} className="zelle-fields">
                <span id="top-header">
                    {EN ? "Receive donations through Zelle!": "¡También puedes recibir donaciones por Zelle!"}
                <span id='orange'>*</span>
                </span>
                <p id="description">
                    {EN ? "To activate this payment method, you must provide the following information:" : "Para activar este método de pago es necesario que nos suministres la siguiente información:"}
                </p>
                {["zelleEmail", "zelleName"].map((field, i) => {
                    return(
                        <>
                        <span id="field-span">{fieldDict[field]}</span>
                        <input
                            type="text"
                            name={field}
                            maxLength="50"
                            placeholder={fieldPlaceHolders[field]}
                            value={field === "zelleEmail" ? user.zelleInfo?.email : user.zelleInfo?.name }
                            className='form-control'
                        /> 
                        </>
                    )
                })}

                <span id="field-span">{EN ? 'Accepting Zelle payment?' : '¿Aceptando Zelle pago?'}</span>
                <Checkbox
                    checked={user.zelleInfo?.isAccepting}
                    style={{
                        marginTop:"-5px",
                        color: '#ea8737',
                        '&.MuiChecked': {
                            color: 'rgba(234, 135, 55, .5)'
                        },
                    }}
                    />
                <br />
                <br />
                <p className="star-des" id="orange">{EN ? "*Donations made through Zelle are disintermediated by Yakera. Donations will be sent directly to your Zelle account immediately and reflected in the total balance of the campaign’s funds." : "*¡Ojo! Las donaciones realizadas a través de Zelle no son monitoreadas por Yakera. Las contribuciones llegarán directo a tu cuenta de Zelle inmediatamente y serán reflejadas en el monto de la campaña."} </p>

            </Grid>     
            <Grid item xs={12} sm={6} className="reserve-fields">
                <p id="top-header">
                    {EN ? "Add your Reserve account to withdraw collected funds!" : "¡Añade los detalles de tu cuenta de Reserve para retirar los fondos recaudados!"}
                </p>
                <p id="description">
                    {EN ? "To transfer the funds you collect through Yakera, you must create a Reserve account and provide the username here." : "Para transferir tus fondos recaudados en Yakera es necesario que nos suministres tu usuario de Reserve aqui."}
                </p>
                <span id="field-span">{fieldDict["reserveUsername"]}</span>
                <input
                    type="text"
                    name="reserveUsername"
                    maxLength="50"
                    placeholder={fieldPlaceHolders["reserveUsername"]}
                    value={user.reserveUsername }
                    className='form-control'
                /> 
                <section className='help-area'>
                    <p>
                        {EN ? "Do you have any questions or need assistance?" : "¿Tienes alguna pregunta o necesitas apoyo?"}
                    </p>
                    <img width="150" src={questionmarkSVG} alt="questionmark-help" />
                    <button onClick={() => window.location.href = "https://chat.whatsapp.com/LcSFQzsohaC1hmlgdbij3D"}>
                        {EN ? "Contact us!" : "¡Contáctanos!"}
                    </button>
                </section>
            </Grid>
        </>
    );
}

export default RecipientOnly;