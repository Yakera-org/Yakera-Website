import React, {useState} from "react";
import RegisterVisuals from './RegisterVisuals'
import { validateFields } from './Validation';
import Author from "../../author";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LanguageService from "../../../services/language";
import { uploadFile } from 'react-s3';

const _axios = require('axios');
const axios = _axios.create();
const yakeraBackUrl = 'https://api.yakera.org';

const S3_BUCKET ='yakera-files';
const REGION ='us-east-2';
const ACCESS_KEY ='AKIAU4TU5VD7SRZU66HO';
const SECRET_ACCESS_KEY ='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';

const config_aws = {
    bucketName: S3_BUCKET,
    region: REGION,
    dirName: 'profile-pictures',
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
}


function Register(props) {

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    location: "",
    age: "",
    donor_phone: "",
    profile_pic: "",
    preference:"email",
    bio: "",
    address: "",
    phone: "",
    socialNum: "",
    airTMNum: "",
    loaded:false,
    isSubmitting: false,
    error: '',
    check:{
      terms:false,
      newsLetter:false
    },
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      password2: null,
      address: null,
      phone: null,
      socialNum: null,
      airTMNum: null,
    },
  };
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [EN, setEN] = React.useState(false);

  React.useEffect(() => {
      if(LanguageService.getLanguage()==='en')setEN(true)
      else setEN(false)
  }, []);
  const handleChange = event => {
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
    if(event.target.name === 'newsLetter'){
      setData({
        ...data,
        check:{
          ...data.check,
          [event.target.name]: !data.check.newsLetter
        }
      })
      return
    }
    setData({
      ...data,
      [event.target.name]: event.target.value
    },);
    validateEntry(event);
  };

  const validateEntry = event => {
    var name = event.target.name;
    const value = event.target.value;
    var error;

    if(name === 'email'){
      error = validateFields.validateEmail(value);
    }else if(name === 'password'){
      error = validateFields.validatePassword(value);
      if(value === data.password2){
        name = 'password2'
        error = false
      }else{
        name = 'password'
        error = validateFields.validatePassword(value);
      }
    }else if(name==='password2'){
      if(value !== data.password){
        error = EN ? 'Passwords do not match' : 'Las contraseñas no coinciden'
      }else{
        error = validateFields.validateName(value)
      }
    }
    // line below could be used later when airTM account number is required
    // else if(name === 'firstName' || name === 'lastName' || name === 'address' || name === 'phone' || name === 'airTMNum' || name === 'socialNum'){
    else if(name === 'firstName' || name === 'lastName' || name === 'address' || name === 'phone' || name === 'socialNum' || name === 'location' || name === 'donor_phone' || name === 'age' || name === 'bio' || name === 'preference'){
      error = validateFields.validateName(value);
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
    if (step === 1){
      return await validateStep1();
    }else if (step === 2){
      return validateStep2();
    }
  }

  async function validateStep1(){
    let emptyWarning = EN ? 'This field cannot be empty' : 'Este campo no puede estar vacío';
    let firstNameError = false;
    let lastNameError = false;
    let emailError = false;
    let passwordError = false;
    let password2Error = false;
    
    if(!data.firstName){
      firstNameError = emptyWarning;
    }
    if(!data.lastName){
      lastNameError = emptyWarning;
    }
    if(!data.email){
      emailError = emptyWarning;     
    }else{
      emailError = validateFields.validateEmail(data.email);
    }
    if(!data.password){
      passwordError = emptyWarning;      
    }else{
      passwordError = validateFields.validatePassword(data.password);
    }
    if(data.password2 !== data.password || !data.password2){
      password2Error = EN ? 'Passwords do not match.' : 'Las contraseñas no coinciden';      
    }

   
    setData({
      ...data,
      errors: { 
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError,
        password2: password2Error,
      }
    })

    if(data.firstName && data.lastName && data.password && data.email && !emailError && !passwordError && !password2Error){
      let valid = await validateEmail(data.email)
      return valid
    }
    return false
  }
  const validateStep2 = () => {
    let emptyWarning = EN ? 'Cannot be empty' : 'No puede estar vacío';
    
    let addressError = false;
    let phoneError = false;
    //let airTMNumError = false;
    let socialNumError = false;
    
    if(!data.address){
      addressError = emptyWarning;      
    }
    if(!data.phone){
      phoneError = emptyWarning;      
    }
    // if(!data.airTMNum){
    //   airTMNumError = emptyWarning;      
    // }
    if(!data.socialNum){
      socialNumError = emptyWarning;      
    }
    
    setData({
      ...data,
      errors: { 
        phone: phoneError,
        // airTMNum: airTMNumError,
        address: addressError,
        socialNum: socialNumError,
      }
    })
    if(data.address && data.socialNum && data.phone){
      return true
    }
    return false
  }
  async function validateEmail(email){
    if(!email)return false
    const url = yakeraBackUrl + '/api/auth/check-email';

    var payload = JSON.stringify({"email":email});

    var config = {
      method: 'post',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : payload
    };    
     
    try {
      const res = await axios(config)

      if(res.data){
        setData({
          ...data,
          error: ''
        })
        return true
      }
    }catch{
      setData({
              ...data,
              error: EN ? 'Email already taken' : 'Correo electrónico ya tomado',
              errors:{
                ...data.errors,
                email: EN ? 'Check the email' : 'Revisa el correo electrónico'
              }
      })
      return false
    }
  }

  function register(isRecipient){
    if(!data.check.terms){
      setData({
        ...data,
        error: EN ? 'Please accept the terms and conditions.' : 'Por favor, acepte los términos y condiciones.'
      })
    }else{
      //loading
      setLoading(true)
      if(isRecipient){
        callRegisterBackend()
      }else{
        callDonorRegister()
      }
    }
  }

  async function callRegisterBackend(){
    const url = yakeraBackUrl + '/api/auth/register';

    // register credentials
    const requestBody = {      
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        IDNumber: data.socialNum,
        language: LanguageService.getLanguage()
    }

    let payload = JSON.stringify(requestBody)
    
    axios.post(url, payload, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setLoading(true)

      if (response.status === 201) {
        setSuccess(EN ? 'Signed up successfully. Email verification was sent.' : 'Se registró correctamente. Se envió la verificación por correo electrónico.')
        setLoading(false)
      }

    }).catch(error => {
      var errorMessage;
      console.log(error);
      if(error.response){  
        errorMessage = EN ? "Something went wrong. Please try again later." : "Se produjo un error. Vuelva a intentarlo más tarde.";
      }
      setLoading(false)
      setData({
        ...data,
        error: errorMessage
      })
    });
}

async function callDonorRegister(){
  const url = yakeraBackUrl + '/api/auth/register';
  var profile = data.profile_pic
  if(typeof data.profile_pic !== 'string'){
    profile = "https://yakera-files.s3.us-east-2.amazonaws.com/profile-pictures/" + data.profile_pic.name
    handleUpload(data.profile_pic)
  }
  // register credentials
  const requestBody = {      
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.donor_phone,
      profilePicture: profile,
      donorInfo:{
        location: data.location,
        age: data.age,
        bio: data.bio
      },
      userType: "donor",
      language: LanguageService.getLanguage(),
      preference: data.preference
  }
  
  let payload = JSON.stringify(requestBody)
  axios.post(url, payload, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }
  }).then(response => {
    setLoading(true)

    if (response.status === 201) {
      setSuccess(EN ? 'Signed up successfully. Email verification was sent.' : 'Se registró correctamente. Se envió la verificación por correo electrónico.')
      setLoading(false)
    }

  }).catch(error => {
    var errorMessage;
    console.log(error);
    if(error.response){  
      errorMessage = EN ? "Something went wrong. Please try again later." : "Se produjo un error. Vuelva a intentarlo más tarde.";
    }
    setLoading(false)
    setData({
      ...data,
      error: errorMessage
    })
  });
}

async function handleUpload (file){
  uploadFile(file, config_aws)
      .then(data => console.log(data))
      .catch(err => console.error(err))
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
        <RegisterVisuals EN={EN} data={data} handleChange={handleChange} validate={validate} register={register} error={data.error} success={success} setError={setData}/>
        <br />
        <br />
        <br />
        <br />
        <Author />
      </div>
  )
}

export default Register
