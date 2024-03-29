import React from 'react'

function Register_conf(props) {

    const EN = props.EN

    return (
        <div className='register-confirmation'>
            <h2>{EN ? 'Almost Ready!' : '¡Casi Listos!'}</h2>
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
                    {EN ? <>I agree to the <a href="terms" target="_blank" rel="noopener">terms and conditions</a> *</> : <>Estoy de acuerdo con los <a href="terms" target="_blank" rel="noopener">términos y condiciones</a> *</>}
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
