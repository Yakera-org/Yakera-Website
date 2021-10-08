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
const setLanguageFromIP = (IPLang) => {
    localStorage.setItem('language', IPLang)
}
const defaultLanguage = "en"
const LanguageService = {
    getLanguage,
    setLanguage,
    setLanguageFromIP
};
  
  export default LanguageService;