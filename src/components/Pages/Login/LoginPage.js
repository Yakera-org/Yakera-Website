import React, { useState } from 'react';
import LoginTemplate from './LoginTemplate';
import { validateFields } from './Validation';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import api from "../../../services/api";
import TokenService from "../../../services/token";


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
      error = validateFields.validatePassword(event.target.value);
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

      if (response.status === 200) {
        setLoader(false)
        TokenService.setAccessToken(response.data.access_token);
        TokenService.setRefreshToken(response.data.refresh_token);
        window.location.href = "/dashboard";
      }
    }).catch(error => {
      var errorMessage = null;
      console.log(error);
      if(error.response){          
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else {
        errorMessage = "Something went wrong. Please try again later.";
      }
      setLoader(false)
      setError({errorMessage: errorMessage});
      setData(data => ({
        email: "",
        password: "",
        loading: false,
        errors: {
          email: null,
          password: null
        }
      }));

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
      />
    </div>
  );
}

export default LoginPage;