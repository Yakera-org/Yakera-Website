const ENVIRONMENTS = {
  production: "production",
  dev: "dev",
};

//change this next line
const currentEnv = ENVIRONMENTS.dev;


const getBackendUrl = () => {
  let backendUrl = "https://api.yakera.org/api";
  if (currentEnv === ENVIRONMENTS.dev) {
    backendUrl = "https://yakera-backend.herokuapp.com/api";
  }
  return backendUrl;
};
const getStripeToken = () => {
  let stripeKey =
    "pk_live_51KjTNTD1ctBA5rzvx5iDGT7idBMfOQjoZ8Ic3MbbQTPg14bMM9aIURbyUTURypVEkqvsJK5jNBUD4DocFRSuK79B00cuzpMyr8";
  if (currentEnv === ENVIRONMENTS.dev) {
    stripeKey =
      "pk_test_51KjTNTD1ctBA5rzvPq6FjtoOxn2bGAPvUX5GluRXOUnaMrINHjQ55uC3ZqllRDaUcoTAITPjPlvT76cNjNlZAPTM00Y71uOjrE";
  }
  return stripeKey;
};

const getCurrentEnvironment = () => {
  return currentEnv;
};
const isInProduction = () => {
  return currentEnv === ENVIRONMENTS.production;
};

const getPayPalClientID = () => {
  // Old credentials:
  // Live: AQMyTaoohTvLTTKQoNaRyr3pH0wtHr1Yj8QxaxCahDV_X1Tbt49yboUyc4YqgjmkpZdU4hJaGmNjJWlp
  // Sandbox: AZkSvUt1RiwtGclqKXhvgsoXv58UkR439TBBGLx9q-AJ-ZxIxOMmSnRL7dJxiqkxLddYxvsbMJGVBxl7
  //
  // Live client id
  let clientID =
    "AeNq4sQYgLadNuoM4o9uTa8G1A5McYB-fuV2J-iP3W8O7uPByyYQZS_XpTUHt5H3KmK-npUHEqOYctX7";
  if (currentEnv === ENVIRONMENTS.dev) {
    // Sandbox client id
    clientID =
      "AQcToFM4znXfqh4JF0XypGFwbY2LpT319ACgoR-pQnPvCEMjg7mf04I6hpulrfK65ZGRMQDzzZtVZc2c";
  }
  return clientID;
};

const Environment = {
  getStripeToken,
  getBackendUrl,
  getCurrentEnvironment,
  getPayPalClientID,
  isInProduction,
};

export default Environment;
