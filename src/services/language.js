const getLanguage = () => {
  let language = localStorage.getItem("language");
  if (!language) language = defaultLanguage;
  return language;
};
const setLanguage = () => {
  let currentLanguage = getLanguage();
  let newLanguage;

  if (currentLanguage === "en") {
    newLanguage = "es";
  } else if (currentLanguage === "es") {
    newLanguage = "en";
  } else {
    newLanguage = defaultLanguage;
  }

  localStorage.setItem("language", newLanguage);
};
const setLanguageFromIP = (IPLang) => {
  if (!localStorage.getItem("language")) {
    localStorage.setItem("language", IPLang);
  }
};
const hasLanguageStored = () => {
  return localStorage.getItem("language");
};

const defaultLanguage = "en";
const LanguageService = {
  getLanguage,
  setLanguage,
  setLanguageFromIP,
  hasLanguageStored,
};

export default LanguageService;
