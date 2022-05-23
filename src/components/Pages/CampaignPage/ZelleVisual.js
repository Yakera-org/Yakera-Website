import React from 'react';
import "./Zelle.css"
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import { Alert } from 'reactstrap';
import HashLoader from "react-spinners/HashLoader";

function ZelleVisual(props) {

    const EN = props.EN;
    const data = props.data;

    return (
        <div>
            
              {EN ? 
                <p id="zelle-top">Amount to be donated via <span>Zelle</span>: ${props.amount} </p> 
              :
                <p id="zelle-top">Cantidad a donar a través de <span>Zelle</span>: ${props.amount} </p> 
              }
              {EN ? 
                <p id="zelle-des">(Amount does not include the tip, as it goes straight to the recipient)</p> 
              :
                <p id="zelle-des">(La donación no incluye la propina, ya que va directamente a la persona beneficiaria)</p> 
              }
            <p>
              {EN ? "Provide us with your Zelle account information!" :
                "Inserte los siguientes detalles asociados a la cuenta de Zelle"}
            </p>
            <div className = "input-container">
              <input
                  type="text"
                  name="email"
                  placeholder={EN ? "Zelle Email*" : "Correo electrónico Zelle*" }
                  className={classnames(
                    'form-control zelle-form',
                    { 'is-valid': data.errors.email === false},
                    { 'is-invalid': data.errors.email }
                  )}
                  onChange={props.handleChange}

              />
              <div className="invalid-feedback">{data.errors.email}</div>

              <input
                  type="text"
                  name="name"
                  placeholder={EN ? "Zelle Name*" : "Nombre en Zelle*" }
                  className={classnames(
                    'form-control zelle-form',
                    { 'is-valid': data.errors.name === false},
                    { 'is-invalid': data.errors.name }
                  )}
                  onChange={props.handleChange}

              />
              <div className="invalid-feedback">{data.errors.name}</div>
              <div style = {{marginTop: "7px", float: "left"}}>{EN ? "*required" : "*requerido"}</div>
            </div>
            <br/>
            <div style = {{marginTop: "30px", float: "left"}}> {EN ?
              <div className = "zelle-screenshot-text">Tranfer the above amount to <i>{props.recipientEmail}</i> with the name  <i>{props.recipientName}</i> on Zelle. <b>Provide us with a screenshot here!</b></div>
            :
             <div className = "zelle-screenshot-text">¡Desde la aplicación de tu banco, selecciona Zelle y transfiere la suma deseada a <i>{props.recipientEmail} </i>a nombre de<i> {props.recipientName}</i> <b> y al final toma una captura de pantalla!</b></div> } </div>

              <ImgUpload EN={EN} photoUpload={props.photoUpload} name={props.ssName} removeScreenShot={props.removeScreenShot}/>

               <div className = "input-container">
                <input
                    type="text"
                    name="reference"
                    placeholder={EN ? "Reference*" : "Referencia" }
                    onChange={props.handleChange}
                    className={classnames(
                    'form-control',
                    { 'is-valid': data.errors.reference === false},
                    { 'is-invalid': data.errors.reference }
                  )}

                />
                <div className="invalid-feedback">{data.errors.reference}</div>
               </div>
               <br />
               <button className = "confirm-button"
                   onClick={props.OnConfirm}
                 >{EN ? "Confirm Payment" : "Confirmar Pago"}</button>

            <div className="sweet-loading">
                <div className='loader-wrapper'>
                    <HashLoader
                        size={50}
                        color={"#ea8737"}
                        loading={props.loading}
                    />
                </div>
            </div>
            { props.error
            ?
                <Alert color="danger" style={{width:"70%", marginLeft:"15%"}}>
                    { props.error }
                </Alert>
            :
            ''
            }
        </div>
    );
}

export default ZelleVisual;


const ImgUpload =({
  EN,
  photoUpload,
  name,
  removeScreenShot
})=>
  <>
    <label id="upload-area" htmlFor="screenshot-upload">
      <button className = "zelle-button">
            {EN ? "Upload Screenshot" : "Subir captura de pantalla"}
        </button>
      <p id="ss-name">{name!== "" ? EN ? "File uploaded: " + name : "Archivo subido: " + name : ""}</p>
      <input id="screenshot-upload" type="file" accept="image/*" onChange={photoUpload}/>
    </label>

      {name
      ?
      <button onClick={removeScreenShot} id="remove">{EN?"Remove Screenshot" : "Eliminar captura"}</button>
      :
      ""
      }
  </>
