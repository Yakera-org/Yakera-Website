// Includes autenticated and unnauthenticated API call methods 


const _axios = require('axios');
const axios = _axios.create();
const qs = require('querystring');

// Getter and setter for the access token
export const getAccessToken = () => {
    const tokenString = localStorage.getItem('accessToken');
    return JSON.parse(tokenString)
};

export const setAccessToken = (token) => {
    localStorage.setItem('accessToken', JSON.stringify(token));
};

export const autenticatedPost = (url, requestBody, config) => {
    // const token = getAccessToken();
    // config.headers.Authorization = `Bearer ${token}`;

    // axios.post(url, qs.stringify(requestBody), config)
};

export const unautenticatedPost = (url, requestBody, config) => {
    return axios.post(url, qs.stringify(requestBody), config)
};

export const autenticatedGet = (url, config) => {
    // const token = getAccessToken();
    // config.headers.Authorization = `Bearer ${token}`;

    // await axios.get(url, config)
};

export const unauthenticatedGet = async (url, config) => {
    return await axios.get(url, config)
        .then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return new Error(res.statusText);
        })
        .catch(error => {
            console.log(error);
        });
};