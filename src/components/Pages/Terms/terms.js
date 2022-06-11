import React from 'react';
import Author from '../../author';

import "./terms.css"

function Terms() {
    const terms = "terms.html"
    return (
        <div className="terms-frame">
            <iframe src={"../" + terms}
                title="termsAndConditions"
                /> 
            <Author />    
        </div>  
    );
}

export default Terms;