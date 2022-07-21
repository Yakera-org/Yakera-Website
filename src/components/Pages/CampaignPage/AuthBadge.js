import React, { Component } from 'react';
import  { Card, CardMedia } from '@material-ui/core';

class AuthBadge extends Component {
    render() {
        const language = this.props.language;
        var EN = true;

        if(language ==="en"){
            EN=true
        }else{
            EN=false
        }

        return (
            <div>
                <Card
                    className="auth-badge"
                    style={{
                        borderRadius: '25px',
                        backgroundColor: '#f0f0f0',
                    }}
                    elevation={0}
                >
                    <div className='auth-badge-content'>
                        <p>
                            {EN ? 'This campaign is verified by ' : 'Yakera ha verificado esta '}
                            <span className='nobreak-wrap'>{EN ? 'Yakera' : 'campaña'}&nbsp;
                            <img className='auth-badge-icon' alt='' src={'https://cdn.discordapp.com/attachments/999630410965331988/999630601437073488/authbadge.png'} /></span>
                        </p>
                    </div>
                </Card>
            </div>
        );
    }
}

export default AuthBadge;
