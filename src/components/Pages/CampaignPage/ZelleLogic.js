import React, { useState } from 'react';
import { validateFields } from '../Register/Validation';
import ZelleVisual from './ZelleVisual';
import api from "../../../services/api";
import S3 from "aws-s3";
import LanguageService from '../../../services/language';
import * as AWSkeys from "../../../services/AWSkeys"

const config_aws = {
  bucketName: AWSkeys.S3_BUCKET,
  region: AWSkeys.REGION,
  dirName: 'zelle-screenshots',
  accessKeyId: AWSkeys.ACCESS_KEY,
  secretAccessKey: AWSkeys.SECRET_ACCESS_KEY
}

const S3Client = new S3(config_aws)

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
        setError("")
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
            upload()
           

            }else{
              setError(props.EN ? "Please upload a screenshot of the transaction." : "Por favor, cargue una captura de pantalla de la transacción.")
            }

          }
          else{
              setError(props.EN ? "Please check all fields are filled." : "Por favor, compruebe que todos los campos están llenos.")
          }

        }

      async function upload (){
        S3Client.uploadFile(SSfile)
            .then(data =>{
                sendToBackend(data.key)
                }
              )
            .catch(err => console.error(err))
      }

      async function sendToBackend(key){
          try {
            const fileAWSLocation = "https://yakera-files.s3.us-east-2.amazonaws.com/" + key
              const payload = {
                  "slug": props.slug,
                  "email": props.email,
                  "name": props.name,
                  "amount": props.amount,
                  "status": "success",
                  "tip": props.tip,
                  "paymentID": data.reference,
                  "comment": props.comment,
                  "language": LanguageService.getLanguage(),
                  "isAnonymous": props.isAnon,
                  "isP2P": true,
                  "paymentReceipt": fileAWSLocation,
                  "paymentMethod": "zelle",
                  "zelleName": data.name,
                  "zelleEmail": data.email
              }
              await api.post(`/campaigns/donate`, payload)
          } catch (err) {
              console.log(err);
              setError(props.EN ? "Something went wrong, please try again." : "Algo salió mal. Por favor, intenta de nuevo.")
          }

          setLoading(false)
          props.openThanks()
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
            <ZelleVisual
              EN = {props.EN}
              data = {data}
              recipientName={props.recipientName}
              recipientEmail={props.recipientEmail}
              amount={props.amount}
              handleChange={handleChange}
              OnConfirm={OnConfirm}
              loading={loading}
              photoUpload={photoUpload}
              ssName={ssName}
              removeScreenShot={removeScreenShot}
              error={error}
            />
        </div>
    );
}

export default ZelleLogic;
