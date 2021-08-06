import React, {useState, useEffect} from "react";
import { validateCampaignFields } from "./Campaign_Validation";
import CreateCampaignVisuals from "./CreateCampaignVisuals";

function CreateCampaign() {

    const initialState = {
        campaignName: "",
        campaignCategory: {
            healthcare: false,
            education: false,
            smallBusiness: false,
            nutrition: false
        },
        amount: "",
        story: "",
        itemizedBudget: "",
        supportPictures: null,
        mainCampaignPictures: null,
        campaignPictures: null,
        errors: {
            campaignName: null,
            amount: null,
            story: null,
            itemizedBudget: null
        },
    };
    const [data, setData] = useState(initialState);

    const handleChange = event => {
        if (event.target.name === 'healthcare'){
            setData({
                ...data,
                campaignCategory:{
                    ...data.check,
                    [event.target.name]: !data.check.healthcare
                }
            })
            return
        }
        if (event.target.name === 'education') {
            setData({
                ...data,
                campaignCategory:{
                    ...data.check,
                    [event.target.name]: !data.check.education
                }
            })
            return
        }
        if (event.target.name === 'smallBusiness') {
            setData({
                ...data,
                campaignCategory:{
                    ...data.check,
                    [event.target.name]: !data.check.smallBusiness
                }
            })
            return
        }
        if (event.target.name === 'nutrition') {
            setData({
                ...data,
                campaignCategory:{
                    ...data.check,
                    [event.target.name]: !data.check.nutrition
                }
            })
            return
        }
        setData({
            ...data,
            [event.target.name]: event.target.value
        },);
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

    function submit(){
        console.log(data);
    }
    return (
        <CreateCampaignVisuals data={data} handleChange={handleChange} validate={validate} submit={submit}/>
    )
}

export default CreateCampaign;