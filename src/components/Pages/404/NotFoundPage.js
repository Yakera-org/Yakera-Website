import React, { Component } from 'react';
import './404.css'

const url = "https://yakera-files.s3.us-east-2.amazonaws.com/yakera/404.jpg";
class NotFoundPage extends Component {
    render() {
        return (
            <div className='not-found'>
                <img src={url} alt='404' />
            </div>
        );
    }
}

export default NotFoundPage;