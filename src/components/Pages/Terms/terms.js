import React, { Component } from 'react';
import './terms.css';

class Terms extends Component{
    
    render(){
        return(
            <div>
                <iframe src={"../terms.html"}
                title="terms"
                className="terms-frame"/>     
            </div>      
        )
    }
}

export default Terms;