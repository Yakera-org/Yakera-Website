import React, { useState } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { validateFields } from "./Validation";
import api from "../../../services/api";
import TokenService from "../../../services/token";
import ResetPasswordTemplate from "./ResetPasswordTemplate";

const ResetPasswordPage = () => {
  // if the token is not there then show 404 not found
  const token = new URLSearchParams(window.location.search).get("token");
  if (!token) {
    window.location.href = "/404";
  }

  const initialState = {
    password1: "",
    password2: "",
    loading: false,
    errors: {
      password1: null,
      password2: null,
    },
  };

  const errorState = {
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);
  const [error, setError] = useState(errorState);
  const [loader, setLoader] = useState(false);

  const handleChange = (event) => {
    event.persist();

    if (error.errorMessage !== null) {
      setError({ errorMessage: null });
    }

    setData((data) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));

    validateForm(event);
  };

  const validateForm = (event) => {
    var error = null;
    error = validateFields.validatePassword(event.target.value);

    setData((data) => ({
      ...data,
      errors: {
        ...data.errors,
        [event.target.name]: error,
      },
    }));
  };

  const handleResetPassword = (event) => {
    const validateEquals = validateFields.validatePasswordEquals(
      data.password1,
      data.password2
    );
    setError({ errorMessage: validateEquals });

    if (validateEquals) {
      setData(() => ({
        password1: "",
        password2: "",
        loading: false,
        errors: {
          password1: null,
          password2: null,
        },
      }));
      return;
    }

    setLoader(true);
    setData((data) => ({
      ...data,
      loading: true,
    }));

    const requestBody = {
      password: data.password1,
    };

    api
      .post(`/auth/reset-password?token=${token}`, requestBody)
      .then((response) => {
        setData((data) => ({
          ...data,
          loading: false,
        }));
        setLoader(false);

        if (response.status === 200) {
          setLoader(false);
          TokenService.setAccessToken(response.data.access_token);
          TokenService.setRefreshToken(response.data.refresh_token);
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        var errorMessage = null;
        if (error.response) {
          if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else {
          errorMessage = "Something went wrong. Please try again later.";
        }
        setLoader(false);
        setError({ errorMessage: errorMessage });
        setData(() => ({
          password1: "",
          password2: "",
          loading: false,
          errors: {
            password1: null,
            password2: null,
          },
        }));
      });
  };

  return (
    <div>
      <div className="loader">
        <Loader
          type="Bars"
          color="#ea8737"
          height={100}
          width={100}
          visible={loader}
        />
      </div>
      <ResetPasswordTemplate
        handleChange={handleChange}
        data={data}
        error={error}
        handleResetPassword={handleResetPassword}
      />
    </div>
  );
};

export default ResetPasswordPage;
