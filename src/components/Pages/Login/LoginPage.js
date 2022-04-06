import React, { useState } from 'react';
import LoginTemplate from './LoginTemplate';
import { validateFields } from '../Register/Validation';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import api from "../../../services/api";
import TokenService from "../../../services/token";
import LanguageService from '../../../services/language';
import Author from '../../author';


const LoginPage = () => {

  const initialState = {
    email: "",
    password: "",
    loading: false,
    errors: {
      email: null,
      password: null,
    },
  };

  const errorState = {
    errorMessage: null,
  }

  const [data, setData] = useState(initialState);
  const [error, setError] = useState(errorState);
  const [loader, setLoader] = useState(false);
  const [EN, setEN] = React.useState(false);

  React.useEffect(() => {
      if(LanguageService.getLanguage()==='en')setEN(true)
      else setEN(false)
  }, []);

  const handleChange = event => {
    event.persist();

    if (error.errorMessage !== null) {
      setError({errorMessage: null});
    }

    setData(data => ({
      ...data,
      [event.target.name]: event.target.value
    }));

    validateForm(event);
    
  };

  const validateForm = event => {
    var error = null;

    if (event.target.name === "email") {
      error = validateFields.validateEmail(event.target.value);
    } else {
      error = validateFields.validateName(event.target.value);
    }
    
    setData(data => ({
      ...data,
      errors: {
        ...data.errors,
        [event.target.name]: error,
      }
    }));

  }

  const handleLogin = event => {
    setLoader(true)
    setData(data => ({
      ...data,
      loading: true,
    })); 

    // validate credentials
    const requestBody = {      
      email: data.email,
      password: data.password
    }

    api.post("/auth/login", requestBody).then(response => {
      setData(data => ({
        ...data,
        loading: false,
      }));
        var type = response.data.user.role
        var redirect = ""
        setLoader(false)
        TokenService.setAccessToken(response.data.access_token);
        TokenService.setRefreshToken(response.data.refresh_token);
        TokenService.setUserType(type)

        if(TokenService.getUserType() === "recipient"){
          redirect = "/dashboard";
        }else if(TokenService.getUserType() === "donor"){
          redirect = "/donor-hub";
        }
        else{
          redirect = ""
        }

        localStorage.setItem('currentTab', redirect);
        window.location.href = redirect ? redirect : "/"
    }).catch(error => {
      var errorMessage = null;
      if(error.response){          
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else {
        errorMessage = EN ? "Something went wrong. Please try again later." : "Se produjo un error. Vuelva a intentarlo más tarde";
      }
      setLoader(false)
      setError({errorMessage: errorMessage});
      setData({
        email: "",
        password: "",
        loading: false,
        errors: {
          email: null,
          password: null
        }
      });

    });
    
  }

  return (
    <div>
      <div className='loader'>
        <Loader
          type="Bars"
          color="#ea8737"
          height={100}
          width={100}
          visible={loader}
        />
      </div>
      <LoginTemplate 
        handleChange = {handleChange}
        data = {data}
        error = {error}
        handleLogin = {handleLogin}
        EN={EN}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    
      <Author />
    </div>
  );
}

export default LoginPage;