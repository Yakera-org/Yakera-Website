import React, { Component } from 'react';

class NotFoundPage extends Component {
    render() {
        return (
            <div style={{marginTop:'150px'}}>
                <h2>Error 404: Page not found</h2>
                <p>This page doesn't exist</p> 
            </div>
        );
    }
}

export default NotFoundPage;