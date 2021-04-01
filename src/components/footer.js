import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div style={{
                width:'100%',
                backgroundColor:'#858585',
                height:'8rem',
                textAlign:'center'
            }}>
                <p style={{
                    paddingTop:'3rem',
                    fontSize:'20px',
                    color:'white'
                }}>
                    Yakera Inc.
                </p>                
            </div>
        );
    }
}

export default Footer;