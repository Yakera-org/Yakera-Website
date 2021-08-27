import React, {useState, useEffect} from "react";
import { validateCampaignFields } from "./Campaign_Validation";
import CreateCampaignVisuals from "./CreateCampaignVisuals";
import Author from '../../author';


function CreateCampaign() {

    const initialState = {
        campaignname: "",
        campaigncategory: "",
        amount: "",
        story: "",
        itemizedbudget: "",
        documents: null,
        mainpic: null,
        campaignpics: null,
        errors: {
            campaignname: null,
            amount: null,
            story: null,
            itemizedbudget: null
        },
    };
    const [data, setData] = useState(initialState);

    const handleChange = event => {
        let name = event.target.name;
        name = name.toLowerCase();

        console.log(name)
        setData({
            ...data,
            [event.target.name]: event.target.value
        },);
        return
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
        <div>
            <CreateCampaignVisuals data={data} handleChange={handleChange} validate={validate} submit={submit}/>
            <Author />
        </div>
    )
}

export default CreateCampaign;