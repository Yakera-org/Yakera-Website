import React, {useState, useEffect} from "react";
import {validateFields} from "../Register/Validation";
import CreateCampaignVisuals from "./CreateCampaignVisuals";
import Author from '../../author';
import api from "../../../services/api";
import LanguageService from "../../../services/language";


function CreateCampaign() {

    const initialState = {
        campaignname: "",
        campaigncategory: "",
        amount: "",
        story: "",
        description: "",
        itemizedbudget: "",
        mainPic: "",
        camPics: [],
        supportPics: [],
        errors: {
            campaignname: null,
            amount: null,
            story: null,
            description: null,
            itemizedbudget: null,
            mainPic: null,
            camPics: null,
            supportPics: null
        },
    };
    const [data, setData] = useState(initialState);
    const [errorMessage, setError] = useState('');
    const [successMessage, setSuccess] = useState('');    
    const [EN, setEN] = React.useState(false);
    const [language, setLanguage] = React.useState('en');
    const [loader, setLoader] = React.useState(false);
    const [hasLoaded, setHasLoaded] = React.useState(false);

    useEffect(() => {
        function startup(){
            if(LanguageService.getLanguage()==='en'){
                setEN(true)
                setLanguage('en')
            }
            else{
                setEN(false)
                setLanguage('es')
            } 
            if (localStorage.getItem('accessToken')) {
                //all good, nothin gneeds to be done
                setHasLoaded(true)
            } else {
                setHasLoaded(true)
                //window.location = '/login';
            }

        }
        startup(); 
    }, []);

    const handleChange = event => {

        let name = event.target.name;
        let value = event.target.value;

        name = name.toLowerCase();
        

        setData({
            ...data,
            [name]: value
        },);

        if(value !== ''){
            setError('')
            setData({
                ...data,
                [name]: value,
                errors: {
                    ...data.errors,
                    [name]: ''
                },
            })
        }

        return
    };


    function validateData(){
        let emptyWarning = EN ? 'This field cannot be empty' : 'Este campo no puede estar vacío' ;
        let emptyPicWarning = EN ? 'No files uploaded' : 'No hay archivos subidos' ;
        let nameError, amountError, storyError, descriptionError, budgetError, mainPicError, camPicsError, supportPicsError;

        if(!data.amount){
            amountError = emptyWarning;
        }else{
            amountError = validateFields.validateNumber(data.amount + '')
        }
        if(!data.campaignname){
            nameError = emptyWarning;     
        }else{
            nameError = validateFields.validateName(data.campaignname);
        }
        if(!data.story){
            storyError = emptyWarning;      
        }else{
            storyError = validateFields.validateName(data.story)
        }
        if(!data.description){
            descriptionError = emptyWarning;      
        }else{
            descriptionError = validateFields.validateName(data.description)
        }
        if(!data.itemizedbudget){
            budgetError = emptyWarning;      
        }else{
        budgetError = validateFields.validateName(data.itemizedbudget)
        }

        if(!data.mainPic){
            mainPicError = emptyPicWarning
        }
        if(data.supportPics.length === 0){
            supportPicsError = emptyPicWarning
        }
        if(data.camPics.length === 0){
            camPicsError = emptyPicWarning
        }
        setData({
            ...data,
            errors: {
                campaignname: nameError,
                amount: amountError,
                story: storyError,
                itemizedbudget: budgetError,
                description: descriptionError,
                mainPic: mainPicError,
                camPics: camPicsError,
                supportPics: supportPicsError
            },
        })
        
        if(!amountError && !storyError && !descriptionError && !nameError && !budgetError && !mainPicError && !camPicsError && !supportPicsError){
            return true
        }
        
        return false
      }

      function linkify(text) {
        //copied from https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '">' + url + '</a>';
        }); 
    }

    async function submit(event){
        event.preventDefault();
        setError("")
        let formattedStory = linkify(data.story)
        formattedStory = formattedStory.replace(/\n/g, " <br />");

        let isValidated = validateData();
        if(isValidated){
            setLoader(true);
            submitToBackend(formattedStory);
        }else{
            setError(EN ? 'Some fields are not valid.' : 'Algunos campos no son válidos.')
        }
        
    }

    async function submitToBackend(story){
        const categories = {
            'small business': 'small_business',
            'healthcare': 'healthcare',
            'education': 'education',
            'nutrition': 'nutrition',

            'pequeños negocios': 'small_business',
            'salud': 'healthcare',
            'educación': 'education',
            'alimentación': 'nutrition'
        }

        const payload = {
            title: data.campaignname,
            targetAmount: data.amount,
            story: story,
            category: categories[ data.campaigncategory ],
            description: data.description,
            itemizedBudget: data.itemizedbudget,
            language: language
        }   
        try {
            await api.post('/campaigns', payload);
            setSuccess(EN ? 'Your campaign has been created successfully!' : '¡Tu campaña se ha creado con éxito!')
            setLoader(false)
        } catch (error) {
            console.log('Error: '+ error);
            setError(EN ? 'Something on our server went wrong, please try again' : 'Se produjo un error en nuestro servidor. Vuelve a intentarlo.')
            setLoader(false)
        }      
    }            
    if(!hasLoaded){
        return(<div>Loading ...</div>)
    }else{
        return (
            <div>
                <CreateCampaignVisuals
                    EN={EN}
                    success={successMessage}
                    error={errorMessage}
                    data={data}
                    handleChange={handleChange}
                    validate={validateData}
                    submit={submit}
                    loader={loader}
                />
                <Author />
            </div>
    )
    }
}

export default CreateCampaign;