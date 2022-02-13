const getLocalRefreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken;
};

const getLocalAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
};

const updateLocalAccessToken = (token) => {
    let accessToken = localStorage.getItem("accessToken");
    accessToken = token;
    localStorage.setItem("accessToken", accessToken);
};

const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
};

const setRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token);
};

const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
};

const removeRefreshToken = () => {
    localStorage.removeItem("refreshToken");
};
const setUserType = (type) => {
        localStorage.setItem("userType", type)
};
const getUserType = () => {
    var userType = localStorage.getItem("userType");

    if (userType === "user" || userType === "admin"){
        return("recipient")
    }else if(userType === "donor"){
        return("donor")
    }
    else {
        return(null)
    }
};
const isDonor = () => {
    if(getUserType() === "donor"){
        return true
    }else{
        return false
    }
};
const isRecipient = () => {
    if(getUserType() === "recipient"){
        return true
    }else{
        return false
    }
};

const TokenService = {
getLocalRefreshToken,
getLocalAccessToken,
updateLocalAccessToken,
setAccessToken,
setRefreshToken,
removeAccessToken,
removeRefreshToken,
getUserType,
setUserType,
isDonor,
isRecipient
};
  
  export default TokenService;