import React, { useState } from 'react';
import LoginTemplate from './LoginTemplate';
import { validateFields } from './Validation';


const LoginPage = () => {

  const _axios = require('axios');
  const axios = _axios.create();
  const qs = require('querystring');
  // const yakeraBackUrl = 'https://yakera-back-dev.eu-west-3.elasticbeanstalk.com';

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
  const [data, setData] = useState(initialState);

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

    // const url = yakeraBackUrl + "/api/auth/login";
    const url = "http://localhost:9000/.netlify/functions/hello"

    // TODO: change the dummy API call
    axios.get(url, qs.stringify(requestBody), config).then(response => {
      setData(data => ({
        ...data,
        loading: false,
      }));
      if (response.data.response === "Hello World !") {
        console.log("User with email ", data.email, "is authenticated");
      } else {
        console.log("User with email ", data.email, "was NOT authenticated");
      }
      // window.location.href = "/";
      // setUserSession(response.data.token, response.data.user);
      // props.history.push('/dashboard');
    });
    
    // TODO: redirect the user somewhere
    // <Route exact path="/">
    //   {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
    // </Route>

    
    // }).catch(error => {
    //   setData(data => ({
    //     ...data,
    //     loading: false,
    //   })); 
    //   if (error.response.status === 401) setError(error.response.data.message);
    //   else setError("Something went wrong. Please try again later. ");
    // });

    window.location.href = "../campaigns";
    
  }

  return (
    <LoginTemplate 
      handleChange = {handleChange}
      data = {data}
      handleLogin = {handleLogin}
    />
  );
}

export default LoginPage;