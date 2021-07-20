import React from 'react'
import {pics} from './picsHome.js';
import './home.css';


function Home() {
    return (
        <div>
            <div className='home-page'>
                <img src={pics.phones} alt='phones'/>
            </div>

        </div>
    )
}

export default Home
