import React, { useState } from 'react';
import { validateFields } from '../Register/Validation';
import ZelleVisual from './ZelleVisual';

function ZelleLogic(props) {

    const initialState = {
        email: "",
        name: "",
        reference: "",
        loading: false,
        errors: {
          email: null,
          name: null,
          reference: null,
        },
      };
    
      const [data, setData] = useState(initialState);
      const [loading, setLoading] = useState(false);
    
      const handleChange = event => {
        event.persist();
    
        setData(data => ({
          ...data,
          [event.target.name]: event.target.value,
          errors: {
              ...data.errors,
            [event.target.name]: null
          },
        }));
        
      };
    
      function OnConfirm(){
       
        let canContinue = validateData() 
        if (canContinue){
            setData(data => ({
                ...data,
                errors: {
                    email: false,
                    name: false,
                    reference: false,
                  },
              })); 
            setLoading(true)
            console.log(data)
            setLoading(false)
        }
      }

      function validateData(){
        var hasPassed = true

        if(validateFields.validateEmail(data.email) !== false){
            setData(data => ({
                ...data,
                errors: {
                  ...data.errors,
                  email: validateFields.validateEmail(data.email)
                }
              })); 
            hasPassed = false
        }

        if(validateFields.validateName(data.name) !== false){
            setData(data => ({
                ...data,
                errors: {
                  ...data.errors,
                  name: validateFields.validateName(data.name)
                }
              })); 
            hasPassed = false
        }

       if(validateFields.validateName(data.reference) !== false){
            setData(data => ({
                ...data,
                errors: {
                  ...data.errors,
                  reference: validateFields.validateName(data.reference)
                }
              })); 
            hasPassed = false
        }
        return hasPassed // all is good, you can proceed
      }
    return (
        <div>
            <ZelleVisual EN = {props.EN} data = {data} handleChange={handleChange} OnConfirm={OnConfirm} loading={loading}/>
        </div>
    );
}

export default ZelleLogic;
