import React, {useState, useEffect} from "react";
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

    const validateEntry = event => {
        const name = event.target.name;
        const value = event.target.value;
        var error;

        if (name === 'campaignName' || name === "story") {
            error = validateCampaignFields.validateName(value);
        }else if (name === 'amount' || name === 'itemizedBudget'){
            error = validateCampaignFields.validateAmount(value);
        }

        if (error !== null) {
            setData({
                ...data,
                [event.target.name]: event.target.value,
                errors:{
                    ...data.errors,
                    [name]: error
                }
            });
        } else {
            setData({
                ...data,
                [event.target.name]: event.target.value,
                errors:{
                    ...data.errors,
                    [name]: null
                }
            });
        }
    }

    const validate = () => {
        let emptyWarning = 'This field cannot be empty';
        let campaignNameError, amountError, storyError, itemizedBudgetError;

        if (!data.campaignName){
            campaignNameError = emptyWarning;
        }
        if (!data.amount){
            amountError = emptyWarning;
        }
        if (!data.story){
            storyError = emptyWarning;
        }
        if (!data.itemizedBudget){
            itemizedBudgetError = emptyWarning;
        }

        setData({
            ...data,
            errors: {
                campaignName: campaignNameError,
                amount: amountError,
                story: storyError,
                itemizedBudget: itemizedBudgetError,
            }
        });

        if (data.campaignName && data.amount && data.story && data.itemizedBudget){
            return true;
        }
        return false;
    }

    async function submit(event){
        event.preventDefault();
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
            <CreateCampaignVisuals data={data} handleChange={handleChange} handleImageChange={handleImageChange} validate={validate} submit={submit}/>
            <Author />
        </div>
    )
}

export default CreateCampaign;