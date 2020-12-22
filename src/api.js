import axios from "axios"

const API = axios.create({
    baseURL:'http://yakera-back-dev.eu-west-3.elasticbeanstalk.com',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
})
API.interceptors.response.use((response) )