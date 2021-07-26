import React from 'react'
import classnames from 'classnames'

function Register_details(props) {
    return (
        <div>

            Details
            <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={props.data.firstName}
                onChange={props.handleChange}
                className={classnames(
                    'form-control',
                    { 'is-valid': props.data.errors.firstName === false },
                    { 'is-invalid': props.data.errors.firstName }
                )}
            />

        </div>
    )
}

export default Register_details
