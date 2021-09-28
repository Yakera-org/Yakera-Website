import React from 'react';
import './EmailVerificationPage.css';


function EmailVerificationTemplate(props) {
    return (
        <div>
            { props.error
                ?
                <h1>{window.alert(props.error)}</h1>
                :
                ''
            }
            { props.success
                ?
                <h1>{window.alert(props.success)}</h1>
                :
                ''
            }
        </div>
    );
};

export default EmailVerificationTemplate;