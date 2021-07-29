import React from 'react'

function Register_conf(props) {

    return (
        <div className='register-confirmation'>
            <h2>Confirmation</h2>
            <hr /> 

            <div className='checks'>
                <input
                    name="terms"
                    type="checkbox"
                    checked={props.data.check.terms}
                    onChange={props.handleChange}
                />
                <label>I agree to the terms and conditions *</label>

                <br />

                <input
                    name="newsLetter"
                    type="checkbox"
                    checked={props.data.check.newsLetter}
                    onChange={props.handleChange}
                />
                <label>I want to be added to the Yakera Newsletter</label>
            </div>   

            <div style={{fontSize:'15px'}}> * required</div>         
        </div>
    )
}

export default Register_conf
