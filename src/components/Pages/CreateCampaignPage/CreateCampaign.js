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
    const [images, setImages] = useState([]);

    const handleChange = event => {

        let name = event.target.name;
        let value = event.target.value;

        name = name.toLowerCase();

        if(name === 'campaignpics' || name === 'documents' || name === 'mainpic'){
            value = event.target.files
        }
        

        setData({
            ...data,
            [name]: value
        },);

        if(value !== ''){
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
        if (event.target.files && event.target.files.length > 0) {
            for (const file of event.target.files) {
                const filename = file.name;
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setImages(images => [...images, { 
                        filename: filename,
                        buffer: reader.result,
                        file: file
                    }]);
                }
            }
        }
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
        
        console.log(formattedStory)

        let isValidated = validateData()
        if(isValidated){
            submitToBackend()
        }else{
            //todo: send feedback that form is not complete
        }
       
    }

    async function submitToBackend(){
        const formdata = new FormData();
        for (const image of images) {
            formdata.append('pictures', image.file);
        }
        const url = 'https://express-backend-api.herokuapp.com/api/upload';
        const res = await axios.post(url, formdata);
        console.log(res.data);
    }
    return (
        <div>
            <CreateCampaignVisuals data={data} handleChange={handleChange} handleImageChange={handleImageChange} validate={validateData} submit={submit}/>
            <Author />
        </div>
    )
}

export default CreateCampaign;