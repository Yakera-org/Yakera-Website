import React, { Component } from 'react';
import  { Card } from '@material-ui/core';

class AuthBadge extends Component {
    render() {
        const language = this.props.language;
        var EN = true;

        if(language ==="en") {
            EN=true
        } else {
            EN=false
        }

        return (

            <div>
                <Card
                    className='auth-badge'
                    style={{
                        borderRadius: '25px',
                        backgroundColor: '#f0f0f0',
                    }}
                    elevation={0}
                >
                    <div className='auth-badge-div'>
                        <p className='auth-badge-content'>
                            {EN ? 'This campaign is verified ' : 'Yakera ha verificado '}
                            <span className='nobreak-wrap'>
                                {EN ? 'by Yakera' : 'esta campaña'}&nbsp;
                                <img className='auth-badge-icon' alt='' src={'https://cdn.discordapp.com/attachments/999630410965331988/999630601437073488/authbadge.png'} />
                            </span>
                        </p>
                    </div>
                </Card>
            </div>
        );
    }
}

export default AuthBadge;
