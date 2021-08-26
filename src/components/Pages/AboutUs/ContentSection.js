import React from 'react'
import './AboutUs.css'

function ContentSection(props) {
    let title = props.title;
    let description = props.description;
    let image = props.image;
    return (
        <div className='content-area'>
            <div className='content-area-inside'>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <img src={image} alt='img-content' />
        </div>
    )
}

export default ContentSection
