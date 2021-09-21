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
    console.log(token);
    localStorage.setItem("accessToken", token);
};

const setRefreshToken = (token) => {
    console.log(token);
    localStorage.setItem("refreshToken", token);
};

const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
};

const removeRefreshToken = () => {
    localStorage.removeItem("refreshToken");
};

const TokenService = {
getLocalRefreshToken,
getLocalAccessToken,
updateLocalAccessToken,
setAccessToken,
setRefreshToken,
removeAccessToken,
removeRefreshToken,
};
  
  export default TokenService;