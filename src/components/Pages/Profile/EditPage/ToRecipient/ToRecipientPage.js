// based on RegisterPage.js
import React, {useState} from "react";
import ToRecipientVisuals from './ToRecipientVisuals'
import { validateFields } from '../../../Register/Validation';
import Author from "../../../../author";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LanguageService from "../../../../../services/language";
import S3 from "aws-s3";
import api from "../../../../../services/api";
import * as AWSkeys from "../../../../../services/AWSkeys"

// don't think i need this cuz i think it's only for pfps
// const config_aws = {
//     bucketName: AWSkeys.S3_BUCKET,
//     region: AWSkeys.REGION,
//     dirName: 'profile-pictures',
//     accessKeyId: AWSkeys.ACCESS_KEY,
//     secretAccessKey: AWSkeys.SECRET_ACCESS_KEY
// }

// const S3Client = new S3(config_aws);

function ToRecipientForm() {

  const initialState = {
    address: "",
    phone: "",
    socialNum: "",
    loaded:false,
    isSubmitting: false,
    error: '',
    errors: {
      address: null,
      phone: null,
      socialNum: null,
    },
    check:{
      terms:false,
    }
  };
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [EN, setEN] = React.useState(false);

  React.useEffect(() => {
      document.getElementById('card').scrollIntoView(false);
      if(LanguageService.getLanguage()==='en')setEN(true)
      else setEN(false)
  }, []);
  const handleChange = event => {
    setData({
      ...data,
      error:'',
    })
    setData({
      ...data,
      [event.target.name]: event.target.value
    },);
    validateEntry(event);
    
    if(event.target.name === 'terms'){
      setData({
        ...data,
        error:'',
        check:{
          ...data.check,
          [event.target.name]: !data.check.terms
        }
      })
      return
    }
  };

  const validateEntry = event => {
    var name = event.target.name;
    const value = event.target.value;
    var error;

    error = validateFields.validateName(value);
    if(/[a-zA-Z]/.test(event.target.value) & event.target.name==="phone"){
      error = EN ? "This doesn't look like a phone number" : "No se parece un número de teléfono";
    }

    if (error !== null) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        errors:{
          ...data.errors,
          [name]: error
        }
      });
    } 
    else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        errors:{
          ...data.errors,
          [name]: null
        }
      });
    }   
  }

  const validate = async (step) =>{
    return validateStep2();
  }

  const validateStep2 = () => {
    let emptyWarning = EN ? 'Cannot be empty' : 'No puede estar vacío';
    
    let addressError = false;
    let phoneError = false;
    let socialNumError = false;
    
    if(!data.address){
      addressError = emptyWarning;      
    }
    if(!data.phone){
      phoneError = emptyWarning;      
    }
    else if(/[a-zA-Z]/.test(data.phone)){
      phoneError = EN ? "This doesn't look like a phone number" : "No se parece un número de teléfono";      
    }
    if(!data.socialNum){
      socialNumError = emptyWarning;      
    }
    
    setData({
      ...data,
      errors: { 
        phone: phoneError,
        address: addressError,
        socialNum: socialNumError,
      }
    })
    if(data.address && data.socialNum && data.errors.phone===false){
      return true
    }
    return false
  }

  function register(isRecipient){
    if(!data.check.terms){
      setData({
        ...data,
        error: EN ? 'Please accept the terms and conditions.' : 'Por favor, acepte los términos y condiciones.'
      })
    } else{
      setLoading(true)
      callRegisterBackend()
    }
  }

  async function callRegisterBackend(){
    // register credentials
    const requestBody = {      
        // firstName: data.firstName,
        // lastName: data.lastName,
        // email: data.email,
        // password: data.password,
        phone: data.phone,
        address: data.address,
        IDNumber: data.socialNum,
        language: LanguageService.getLanguage()
    }

    let payload = JSON.stringify(requestBody)
    setLoading(true)

    callBackend(payload)    
}

async function callBackend(payload){
  try{
    await api.post('/auth/register', payload)  
    setSuccess(EN ? 'Account type changed to recipient.' : 'El tipo de cuenta ha cambiado a destinatario.')
  }catch(e){
    console.error(e)
    let errorMessage = EN ? "Something went wrong. Please try again later." : "Se produjo un error. Vuelva a intentarlo más tarde.";
    setData({
      ...data,
      error: errorMessage
    })
  }finally{
    setLoading(false)
  }
}

return (
    <div>
      <div className='loader'>
        <Loader
          type="Bars"
          color="#052a5cd2"
          height={100}
          width={100}
          visible={loading}
        />
      </div>
      <ToRecipientVisuals EN={EN} data={data} handleChange={handleChange} validate={validate} register={register} error={data.error} success={success} setError={setData}/>
      <br />
      <br />
      <br />
      <br />
      <Author />
    </div>
)
}

export default ToRecipientForm
