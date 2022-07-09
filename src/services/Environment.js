const ENVIRONMENTS = {
    production: "production",
    dev: "dev"
}

// Change this next line
const currentEnv = ENVIRONMENTS.dev

const getBackendUrl = () => {
    let backendUrl = "https://api.yakera.org/api";

    if (currentEnv === ENVIRONMENTS.dev) {
        backendUrl = "https://yakera-backend.herokuapp.com/api";
    }

    return backendUrl;
}
const getStripeToken = () => {
    let stripeKey = "pk_live_51KjTNTD1ctBA5rzvx5iDGT7idBMfOQjoZ8Ic3MbbQTPg14bMM9aIURbyUTURypVEkqvsJK5jNBUD4DocFRSuK79B00cuzpMyr8";

    if (currentEnv === ENVIRONMENTS.dev) {
        stripeKey = "pk_test_51KjTNTD1ctBA5rzvPq6FjtoOxn2bGAPvUX5GluRXOUnaMrINHjQ55uC3ZqllRDaUcoTAITPjPlvT76cNjNlZAPTM00Y71uOjrE";
    }

    return stripeKey;
}

const getPayPalClientID = () => {
    let clientID = 'AQMyTaoohTvLTTKQoNaRyr3pH0wtHr1Yj8QxaxCahDV_X1Tbt49yboUyc4YqgjmkpZdU4hJaGmNjJWlp';

    if (currentEnv === ENVIRONMENTS.dev) {
        clientID = 'AZkSvUt1RiwtGclqKXhvgsoXv58UkR439TBBGLx9q-AJ-ZxIxOMmSnRL7dJxiqkxLddYxvsbMJGVBxl7';
    }

    return clientID;
}

const Environment = {
    getStripeToken,
    getBackendUrl,
    getPayPalClientID,
};
  
export default Environment;
