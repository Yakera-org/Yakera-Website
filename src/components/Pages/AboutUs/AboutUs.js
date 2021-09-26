import React from 'react'
import Author from '../../author'
import './AboutUs.css'
import AboutUsVisuals from './AboutUsVisuals'

function AboutUs() {

    return (
        <div className='about-us-page'>
            <AboutUsVisuals />
            <Author />
        </div>
    )
}

export default AboutUs
