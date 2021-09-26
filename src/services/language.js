const getLanguage = () => {
    let language = localStorage.getItem("language");
    if(!language)language=defaultLanguage
    return language;
};
const setLanguage = () => {
    let currentLanguage = getLanguage();
    let newLanguage = defaultLanguage;

    if(currentLanguage === 'en'){
        newLanguage = 'es'
    }else if(currentLanguage === 'es'){
        newLanguage = 'en'
    }

    localStorage.setItem('language', newLanguage)
};
const defaultLanguage = "es"
const LanguageService = {
getLanguage,
setLanguage
};
  
  export default LanguageService;