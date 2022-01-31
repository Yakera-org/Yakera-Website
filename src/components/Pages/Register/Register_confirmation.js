import React from 'react'

function Register_conf(props) {

    const EN = props.EN

    return (
        <div className='register-confirmation'>
            <h2>{EN ? 'Confirmation' : 'Confirmación'}</h2>
            <hr /> 

            <div className='checks'>
                <input
                    name="terms"
                    type="checkbox"
                    id='terms'
                    checked={props.data.check.terms}
                    onChange={props.handleChange}
                />
                <label htmlFor='terms'>
                    {EN ? 'I agree to the terms and conditions *' : 'Estoy de acuerdo con los términos y condiciones *'}
                </label>

                <br />

                <input
                    name="newsLetter"
                    type="checkbox"
                    id='newsletter'
                    checked={props.data.check.newsLetter}
                    onChange={props.handleChange}
                />
                <label htmlFor='newsletter'>
                    {EN ? 'I want to be added to the Yakera Newsletter' : 'Quiero ser agregado a la Newsletter de Yakera'}
                </label>
            </div>   

            <div style={{fontSize:'15px'}}>{EN ? '* required' : '* requerido'} </div>         
        </div>
    )
}

export default Register_conf
