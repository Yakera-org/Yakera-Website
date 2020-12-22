import React, { Component } from 'react';
import './about.css';
import {pics} from './pics.js';
import texts from './texts.json';

import Author from '../../author';

class AboutUs extends Component{

    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
        }
    }

    componentDidMount() { 
        if (typeof window !== "undefined") {
            window.onscroll = () => {
            let currentScrollPos = 800 - window.pageYOffset;

            this.setState({
                    opacity: currentScrollPos / 300,
                    })  
            }
        }
    }
    
    render(){
        return(
            <div className='about'>
                    <div className='about-banner'>
                        <img
                            width="100%"
                            src={pics.about}
                            alt="about"
                            style={{opacity:this.state.opacity}}
                        />
                    </div>
                    <div className='about-page'>
                        
                        <h1>What is Yakera</h1>
                        {texts.what.map((p, index) => 
                        <div key={index+"d"}>
                            <p key={index}>
                                {p}
                            </p> 
                        </div>
                            )}

                        <div className='about-banner-page'>
                            <img
                                width="100%"
                                src={pics.mission}
                                alt="mission"
                            />
                        </div>

                        <h1>Mission</h1>
                        <p>
                            {texts.mission}
                        </p>

                        <div className='about-banner-page'>
                            <img
                                width="100%"
                                src={pics.what}
                                alt="what"
                            />
                        </div>

                        <h1>What do we want to accomplish?</h1>
                        <p>
                            {texts.accomplish}
                        </p>

                        <div className='about-banner-page'>
                            <img
                                width="100%"
                                src={pics.how}
                                alt="how"
                            />
                        </div>

                        <h1>How it works</h1>
                        <p>
                            {texts.how}
                        </p>

                        <div className='about-banner-page'>
                            <img
                                width="100%"
                                src={pics.trial}
                                alt="trial"
                            />
                        </div>

                        <h1>Our long term Goals</h1>
                        <p>
                            {texts.goals}
                        </p>

                        <div className='about-sdg-page'>
                            <img
                                width="100%"
                                src={pics.sdgs}
                                alt="sdgs"
                            />
                        </div>

                        <h1>Yakera and the Sustainable Development Goals</h1>
                        <p>
                            {texts.sdgs}
                        </p>
                        
                        <div className='sdg-card'>
                            <img
                                width="100%"
                                src={pics.sdg1}
                                alt="sdg1"
                            />
                        </div>
                        <p>
                            <b>{texts.sdg1[0]}</b>
                            <br />
                            {texts.sdg1[1]}
                        </p>

                        <div className='sdg-card'>
                            <img
                                width="100%"
                                src={pics.sdg2}
                                alt="sdg2"
                            />
                        </div>
                        <p>
                            <b>{texts.sdg2[0]}</b>
                            <br />
                            {texts.sdg2[1]}
                        </p>

                        <div className='sdg-card'>
                            <img
                                width="100%"
                                src={pics.sdg3}
                                alt="sdg3"
                            />
                        </div>
                        <p>
                            <b>{texts.sdg3[0]}</b>
                            <br />
                            {texts.sdg3[1]}
                        </p>

                        <div className='sdg-card'>
                            <img
                                width="100%"
                                src={pics.sdg4}
                                alt="sdg4"
                            />
                        </div>
                        <p>
                            <b>{texts.sdg4[0]}</b>
                            <br />
                            {texts.sdg4[1]}
                        </p>

                        <div className='sdg-card'>
                            <img
                                width="100%"
                                src={pics.sdg8}
                                alt="sdg8"
                            />
                        </div>
                        <p>
                            <b>{texts.sdg8[0]}</b>
                            <br />
                            {texts.sdg8[1]}
                        </p>
                            

                    </div>

                    <Author />
            </div>
        
        )
    }
}

export default AboutUs;