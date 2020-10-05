import validator from 'validator'; 

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

class ValidateFields {
  /*
   * A method that takes in the email
   * Validates it
   * Returns the response either error or false if there is no error
   */
  validateEmail(email) {
    if (validator.isEmpty(email)) {
      return 'Email is required';
    } else if (!validator.isEmail(email)) {
      return 'Invalid Email';
    }
    return false;
  }
  validateName(name){
      if(validator.isEmpty(name)){
          return'This field cannot be empty';
      }
      return false;
  }
  validateNumber(num){
    if(validator.isEmpty(num)){
      return'This field cannot be empty';
    } else if (!validator.isNumeric(num)){
        return 'Invalid Number';
    }
    return false;
  }
  validateAddress(address){
    if(validator.isEmpty(address)){
      return'This field cannot be empty';
    }
    return false;
  }
  validatePassword(password) {
    if (validator.isEmpty(password)) {
      return 'Password is required';
    } else if (!validator.isLength(password, { min: 8 })) {
      return 'Password should be minimum 8 characters';
    }
    return false;
  }
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };