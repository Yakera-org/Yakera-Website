import validator from 'validator'; 
import LanguageService from "../../../services/language";

/*
 * This class contains methods for validating fields using 'validator.js' library methods
 * The methods return error message if validation failed and false otherwise
 * You can use all supported validators and sanitizers of 'validator.js' libaray
 * See their docs here https://github.com/validatorjs/validator.js
 */

const language = LanguageService.getLanguage()

var EN;
if(language === "en"){
    EN = true
}else{
    EN = false
}
class ValidateFields {

  /*
   * A method that takes in the email
   * Validates it
   * Returns the response either error or false if there is no error
   */
  validateEmail(email) {
    if (validator.isEmpty(email)) {
      return EN ? 'Email is required' : 'Email es requerido' ;
    } else if (!validator.isEmail(email)) {
      return EN ? 'Invalid Email': 'Email inválido';
    }
    return false;
  }
  validateName(name){
    if(validator.isEmpty(name)){
        return EN ?'This field cannot be empty' : 'Este campo no puede estar vacío';
    }
    return false;
  }
  validateNumber(num){
    if(validator.isEmpty(num)){
      return EN ? 'This field cannot be empty' : 'Este campo no puede estar vacío';
    } else if (!validator.isNumeric(num) || num <= 0){
        return EN ? 'Invalid Number' : 'Número invalido';
    }
    return false;
  }
  validateAddress(address){
    if(validator.isEmpty(address)){
      return EN ? 'This field cannot be empty' : 'Este campo no puede estar vacío';
    }
    return false;
  }
  validatePassword(password) {
    if (validator.isEmpty(password)) {
      return EN ? 'Password is required' : 'Se requiere contraseña';
    } else if (!validator.isLength(password, { min: 6 })) {
      return EN ? 'Password should be minimum 6 characters' : 'La contraseña debe tener un mínimo de 6 caracteres';
    }
    return false;
  }
}

const validateFields = new ValidateFields();

// export the class instance, so we can import and use it anywhere
export { validateFields };