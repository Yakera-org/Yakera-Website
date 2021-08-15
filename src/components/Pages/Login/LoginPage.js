import React, { useState } from 'react';
import LoginTemplate from './LoginTemplate';
import { validateFields } from './Validation';


const LoginPage = () => {

  const _axios = require('axios');
  const axios = _axios.create();
  const qs = require('querystring');
  const yakeraBackUrl = 'https://express-backend-api.herokuapp.com';

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

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

  const handleChange = event => {
    event.persist();

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
    setData(data => ({
      ...data,
      loading: true,
    })); 

    // validate credentials
    const requestBody = {      
      email: data.email,
      password: data.password,
    }

    const url = yakeraBackUrl + "/api/auth/login";
    
    axios.post(url, qs.stringify(requestBody), config).then(response => {
      setData(data => ({
        ...data,
        loading: false,
      }));
      // window.location.href = "/";
      // setUserSession(response.data.token, response.data.user);
      // props.history.push('/dashboard');
    
      window.location.href = "../campaigns";

    }).catch(error => {
      var errorMessage = null;
      console.log(error);

      if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = "Something went wrong. Please try again later.";
      }

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
    <LoginTemplate 
      handleChange = {handleChange}
      data = {data}
      error = {error}
      handleLogin = {handleLogin}
    />
  );
}

export default LoginPage;