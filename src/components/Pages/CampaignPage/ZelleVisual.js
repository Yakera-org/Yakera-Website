import React from 'react';
import "./Zelle.css"
// import { uploadFile } from 'react-s3';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';

function ZelleVisual(props) {

    const EN = props.EN;
    const data = props.data;

    return (
        <div>
            <p>
              {EN ? "Provide us with your Zelle account information!" :
                "Inserte los siguientes detallas asociados a la cuenta de Zelle"}
            </p>
            <div className = "input-container">
              <input
                  type="text"
                  name="email"
                  placeholder={EN ? "Email*" : "Correo electrónico*" }
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
                  placeholder={EN ? "Name*" : "Tu dirección" }
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
              <div className = "zelle-screenshot-text">Tranfer the above amount to jane.doe@gmail.com with the name John Doe on Zelle. <b>Provide us with a screenshot here!</b></div>
            :
             <div className = "zelle-screenshot-text">Tranfiere el monto a jane.doe@gmail.com en Zelle a nombre de John Doe. <b>Desde la aplicación de tu banco y toma una captura de pantalla!</b></div> } </div>

             <Button className = "zelle-button"
                 to="/register"
                 style={{
                   width:'70%',
                   border:'none',
                   backgroundColor:'#ea8737',
                   borderRadius:'10px',
                   color:'white',
                   padding:'5px',
                   fontSize: '13px',
                   margin: "20px 0px 20px 0px"
                 }}
               >{EN ? "Upload Screenshot" : "Subir captura de pantalla"}</Button>
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
               <Button className = "zelle-button"
                   to="/register"
                   onClick={props.OnConfirm}
                   style={{
                     width:'70%',
                     border:'none',
                     backgroundColor:'#0046A8',
                     borderRadius:'10px',
                     color:'white',
                     padding:'5px',
                     fontSize: '13px',
                     margin: "30px 0px 20px 0px"
                   }}
                 >{EN ? "Confirm Payment" : "Confirmar Pago"}</Button>
        </div>
    );
}

export default ZelleVisual;
