import validator from 'validator';

class ValidateCampaignFields {

    validateName(name) {
        if (validator.isEmpty(name)) {
            return 'This field cannot be empty';
        }
        return false;
    }

    validateAmount(amount) {
        if (validator.isEmpty(amount)) {
            return 'This field cannot be empty';
        } else if (!validator.isNumeric(amount) || amount <= 0) {
            return 'Invalid Number';
        }
        return false;
    }

    // validateStory(story) {
    //     if (validator.isEmpty(story)) {
    //         return 'This field cannot be empty';
    //     }
    //     return false;
    // }

    // validateItemizedBudget(itemizwd_budget) {
    //     if (validator.isEmpty(story)) {
    //         return 'This field cannot be empty';
    //     }
    //     return false;
    // }
}

const validateCampaignFields = new ValidateCampaignFields();

export { validateCampaignFields };