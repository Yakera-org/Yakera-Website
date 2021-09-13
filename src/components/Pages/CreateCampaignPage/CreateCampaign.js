import React, {useState} from "react";
import { validateCampaignFields } from "./Campaign_Validation";
import CreateCampaignVisuals from "./CreateCampaignVisuals";
import Author from '../../author';
import * as axios from 'axios'


function CreateCampaign() {

    const initialState = {
        campaignname: "",
        campaigncategory: "",
        amount: "",
        story: "",
        itemizedbudget: "",
        documents: [],
        mainpic: null,
        campaignpics: [],
        errors: {
            campaignname: null,
            amount: null,
            story: null,
            itemizedbudget: null
        },
    };
    const [data, setData] = useState(initialState);
    const [errorMessage, setError] = useState('');
    const [formattedStory, setStory] = useState('');
    const [files, setFiles] = useState([]);

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
        let emptyWarning = 'This field cannot be empty';
        let nameError, amountError, storyError, budgetError;
        
        if(!data.amount){
            amountError = emptyWarning;
        }else{
            amountError = validateCampaignFields.validateAmount(data.amount + '')
        }
        if(!data.campaignname){
            nameError = emptyWarning;     
        }else{
            nameError = validateCampaignFields.validateName(data.campaignname);
        }
        if(!data.story){
            storyError = emptyWarning;      
        }else{
            storyError = validateCampaignFields.validateName(data.story)
        }
        if(!data.itemizedbudget){
            budgetError = emptyWarning;      
        }else{
        budgetError = validateCampaignFields.validateName(data.itemizedbudget)
        }
        setData({
            ...data,
            errors: {
                campaignname: nameError,
                amount: amountError,
                story: storyError,
                itemizedbudget: budgetError
            },
        })

        if(!amountError && !storyError && !nameError && !budgetError){
            return true
        }
        
        return false
      }

      function linkify(text) {
        //copied from https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, function(url) {
            return '<a href="' + url + '">' + url + '</a>';
        }); 
    }


    async function submit(event){
        event.preventDefault();
        let formattedStory = linkify(data.story)
        formattedStory = formattedStory.replace(/\n/g, " <br />");
        setStory(formattedStory)

        let isValidated = validateData()
        console.log(data)

        if(isValidated){
            submitToBackend()
        }else{
            setError('Some info is not correct, please check the fields.')
        }
    }

    async function submitToBackend(){
        //https://dev.to/fadiamg/multiple-file-inputs-with-one-submit-button-with-react-hooks-kle
        const formdata = new FormData();
        for (const file of files) {
            formdata.append(file.name, file.uploadedFile);
        }
        // const categories = {
        //     'Small Business': 'small_business',
        //     'Healthcare': 'healthcare',
        //     'Education': 'education',
        //     'Nutrition': 'nutrition'
        // }
        const payload = {
            title: data.campaignname,
            targetAmount: data.amount,
            story: formattedStory,
            category: data.campaigncategory,
            description: 'Help Nutriendo El Futuro provide books and school supplies to dozens of children in El Calvario and buy chairs and tables for their community kitchen.'
        }
        for ( var key in payload ) {
            formdata.append(key, payload[key]);
        }
        // Heroku Live
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM1OWExZGE4MTI0MDAwNDc5OGUyOSIsImlhdCI6MTYzMTQxMjI5Nn0.AaOAzUfKvuIyL2j6VSjI0DtCRb7W3nck7ohfxFCu3TE';
        // Heroku Local
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjcyZTgxZGZkYTc4MTEzYzE5NTBlMCIsImlhdCI6MTYzMTM5NjEzMn0.4vs08muUTucSu9Pi5HUwA6oStxyVrcBYZlh-x0TzAGw'
        const url = 'https://express-backend-api.herokuapp.com/api/campaigns';
        const res = await axios.post(url, formdata, { 
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res.data);
        
    }

            
       
    return (
        <div>
             <CreateCampaignVisuals error={errorMessage} data={data} handleChange={handleChange} handleImageChange={handleImageChange} validate={validateData} submit={submit}/>
            <Author />
        </div>
    )
}

export default CreateCampaign;