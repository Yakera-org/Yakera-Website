const ENVIRONMENTS = {
    production: "production",
    dev: "dev"
}
//const currentEnv = ENVIRONMENTS.dev
const currentEnv = ENVIRONMENTS.production

const getBackendUrl = () => {
    let backendUrl = "https://api.yakera.org/api"
    if(currentEnv===ENVIRONMENTS.dev){
        backendUrl = "https://yakera-backend.herokuapp.com/api"
    }
    return backendUrl
}
const getStripeToken = () => {
    let stripeKey = "pk_live_51KjTNTD1ctBA5rzvx5iDGT7idBMfOQjoZ8Ic3MbbQTPg14bMM9aIURbyUTURypVEkqvsJK5jNBUD4DocFRSuK79B00cuzpMyr8"
    if(currentEnv===ENVIRONMENTS.dev){
        stripeKey = "pk_test_51KjTNTD1ctBA5rzvPq6FjtoOxn2bGAPvUX5GluRXOUnaMrINHjQ55uC3ZqllRDaUcoTAITPjPlvT76cNjNlZAPTM00Y71uOjrE"
    }
    return stripeKey
}

const Environment = {
    getStripeToken,
    getBackendUrl
};
  
  export default Environment;