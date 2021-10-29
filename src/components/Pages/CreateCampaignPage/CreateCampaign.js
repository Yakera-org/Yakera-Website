import React, {useState} from "react";
import {validateFields} from "../Register/Validation";
import CreateCampaignVisuals from "./CreateCampaignVisuals";
import Loader from "react-loader-spinner";
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
        errors: {
            campaignname: null,
            amount: null,
            story: null,
            description: null,
            itemizedbudget: null
        },
    };
    const [data, setData] = useState(initialState);
    const [errorMessage, setError] = useState('');
    const [successMessage, setSuccess] = useState('');    
    const [files, setFiles] = useState([]);
    const [EN, setEN] = React.useState(false);
    const [language, setLanguage] = React.useState('en');
    const [loader, setLoader] = React.useState(false);

    React.useEffect(() => {
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
            } else {
                window.location = '/login';
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

    const handleImageChange = event => {
        if(event.target.files.length === 0)return;
        const name = event.target.name;
        if (event.target.files && event.target.files.length > 1) {
            for (const file of event.target.files) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setFiles(files => [...files, { name: name, uploadedFile: file }]);
                };
            }
            return;
        }
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            setFiles(files => [...files, { name: name, uploadedFile: file }]);
        };
    };

    function validateData(){
        let emptyWarning = EN ? 'This field cannot be empty' : 'Este campo no puede estar vacío' ;
        let nameError, amountError, storyError, descriptionError, budgetError;
        const fileNum = files.length;

        if(fileNum !== 3){
            setError(EN ? 'Please upload a document for each image field.' : 'Sube un documento para cada campo de imagen.')
        }

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
        setData({
            ...data,
            errors: {
                campaignname: nameError,
                amount: amountError,
                story: storyError,
                itemizedbudget: budgetError,
                description: descriptionError
            },
        })

        if(!amountError && !storyError && !descriptionError && !nameError && !budgetError && fileNum === 3){
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
        let formattedStory = linkify(data.story)
        formattedStory = formattedStory.replace(/\n/g, " <br />");
        
        let isValidated = validateData()
        
        if(isValidated){
            setLoader(true)
            submitToBackend(formattedStory)
        }else{
            let fileNum = 0
            for (const file of files) {
                fileNum ++
                console.log(file)
            }

            if(fileNum !== 3){
                setError(EN ? 'Please upload a document for each image field.' : 'Sube un documento para cada campo de imagen.')
            }else{
                setError(EN ? 'Some info is not correct, please check the fields.' : 'Alguna información no es correcta, por favor revise los campos.')
            }
        }
    }

    async function submitToBackend(story){
        //https://dev.to/fadiamg/multiple-file-inputs-with-one-submit-button-with-react-hooks-kle
        const formdata = new FormData();
        for (const file of files) {
            formdata.append(file.name, file.uploadedFile);
        }

        // TODO: Remove this. Temp solution for getting campaign categories 
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
        for ( var key in payload ) {
            formdata.append(key, payload[key]);
        }
        try {
            await api.post('/campaigns', formdata);
            setSuccess(EN ? 'Your campaign has been created successfully!' : '¡Tu campaña se ha creado con éxito!')
            setLoader(false)
        } catch (error) {
            console.log('Error: '+ error);
            setError(EN ? 'Something on our server went wrong, please try again' : 'Se produjo un error en nuestro servidor. Vuelve a intentarlo.')
            setLoader(false)
        }      
    }            
       
    return (
        <div>
            <div className='loader'>
                <Loader
                type="Bars"
                color="#ea8737"
                height={100}
                width={100}
                visible={loader}
                />
            </div>
             <CreateCampaignVisuals EN={EN} success={successMessage} error={errorMessage} data={data} handleChange={handleChange} handleImageChange={handleImageChange} validate={validateData} submit={submit}/>
            <Author />
        </div>
    )
}

export default CreateCampaign;