import React, { useState } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { validateFields } from './Validation';
import api from "../../../services/api";
import TokenService from "../../../services/token";
import ForgotPasswordTemplate from './ForgotPasswordTemplate';



const ForgotPasswordPage = () => {

  const initialState = {
    email: "",
    loading: false,
    errors: {
      email: null,
    },
  };

  const errorState = {
    errorMessage: null,
  }

  const messageState = {
    message: null,
  }

  const [data, setData] = useState(initialState);
  const [error, setError] = useState(errorState);
  const [message, setMessage] = useState(messageState);
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
    error = validateFields.validateEmail(event.target.value);
    
    setData(data => ({
      ...data,
      errors: {
        ...data.errors,
        [event.target.name]: error,
      }
    }));

  }

  const handleForgotPassword = event => {
    setLoader(true)
    setData(data => ({
      ...data,
      loading: true,
    })); 

    // validate credentials
    const requestBody = {      
      email: data.email
    }

    api.post("/auth/forgot-password", requestBody).then(response => {
      setData(data => ({
        ...data,
        loading: false,
      }));
      setLoader(false);
      setMessage({message: response.data.message});

    }).catch(error => {
      var errorMessage = null;
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
        loading: false,
        errors: {
          email: null,
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
      <ForgotPasswordTemplate 
        handleChange = {handleChange}
        data = {data}
        error = {error}
        message = {message}
        handleForgotPassword = {handleForgotPassword}
      />
    </div>
  );
}

export default ForgotPasswordPage;