import React, { useState } from 'react';
import { validateFields } from '../Register/Validation';
import ZelleVisual from './ZelleVisual';

import { uploadFile } from 'react-s3';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY

const config_aws = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: 'zelle-screenshots',
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
}


function ZelleLogic(props) {

    const initialState = {
        email: "",
        name: "",
        reference: "",
        loading: false,
        ss_url: "",
        errors: {
          email: null,
          name: null,
          reference: null,
        },
      };
    
      const [data, setData] = useState(initialState);
      const [loading, setLoading] = useState(false);
      const [ssName, setSSName] = useState("");
      const [SSfile, setFile] = useState("");
      const [error, setError] = useState("");
    
      const handleChange = event => {
        event.persist();
        setError("")
        setData(data => ({
          ...data,
          [event.target.name]: event.target.value,
          errors: {
              ...data.errors,
            [event.target.name]: null
          },
        }));
        
      };
    
      function OnConfirm(){
       
        let canContinue = validateData() 
        if (canContinue){
          setData(data => ({
              ...data,
              errors: {
                  email: false,
                  name: false,
                  reference: false,
                },
            })); 
          if(SSfile !== ""){     
            setLoading(true)
            uploadAWS()
            console.log(data)
            setLoading(false)
            }else{
              setError(props.EN ? "Please upload a screenshot of the transaction." : "Por favor, cargue una captura de pantalla de la transacción.")
            }
          }else{
              setError(props.EN ? "Please check all fields are filled." : "Por favor, compruebe que todos los campos están llenos.")
          }
        }

      async function uploadAWS (){
        await uploadFile(SSfile, config_aws)
            .then(data => console.log(data))
            .catch(err => console.error(err))
      }

      function validateData(){
        var hasPassed = true

        if(validateFields.validateEmail(data.email) !== false){
            setData(data => ({
                ...data,
                errors: {
                  ...data.errors,
                  email: validateFields.validateEmail(data.email)
                }
              })); 
            hasPassed = false
        }

        if(validateFields.validateName(data.name) !== false){
            setData(data => ({
                ...data,
                errors: {
                  ...data.errors,
                  name: validateFields.validateName(data.name)
                }
              })); 
            hasPassed = false
        }

       if(validateFields.validateName(data.reference) !== false){
            setData(data => ({
                ...data,
                errors: {
                  ...data.errors,
                  reference: validateFields.validateName(data.reference)
                }
              })); 
            hasPassed = false
        }
        return hasPassed // all is good, you can proceed
      }
      function photoUpload(e){
        setError("")
        e.preventDefault();

        if(e.target.files.length > 0){
            const file = e.target.files[0];
            if(file.size > 5000000){
                props.EN 
                    ? alert("File too large. (>5MB)")
                    : alert("Archivo es demasiado grande (>5mb)")
            }else{
                var fileName = file.name;
                var idxDot = fileName.lastIndexOf(".") + 1;
                var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                if (extFile==="jpg" || extFile==="jpeg" || extFile==="png"){
                  setSSName(fileName)
                  setFile(file)
                }else{
                    props.EN
                        ? alert("Only png/jpg/jpeg and png files are allowed!")
                        : alert("Solamente se acepta archivos png./jpg/jpeg!");
                }              
            }
        }
      }
      function removeScreenShot(){
        setSSName("")
        setFile("")
      }

    return (
        <div>
            <ZelleVisual EN = {props.EN} data = {data} handleChange={handleChange} OnConfirm={OnConfirm} loading={loading} photoUpload={photoUpload} ssName={ssName} removeScreenShot={removeScreenShot} error={error}/>
        </div>
    );
}

export default ZelleLogic;
