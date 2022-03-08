import React, { useState } from 'react';
import { validateFields } from '../Register/Validation';
import ZelleVisual from './ZelleVisual';

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
    
      const handleChange = event => {
        event.persist();
    
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
            setLoading(true)
            console.log(data)
            setLoading(false)
        }
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
      }
      function OnScreenshot(){
        console.log("hi")
      }

    return (
        <div>
            <ZelleVisual EN = {props.EN} data = {data} handleChange={handleChange} OnScreenshot={OnScreenshot} OnConfirm={OnConfirm} loading={loading} photoUpload={photoUpload} ssName={ssName} removeScreenShot={removeScreenShot}/>
        </div>
    );
}

export default ZelleLogic;
