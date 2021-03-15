import React, { Component } from 'react';
import texts from './texts.json';
import './FAQ.css';
import banner from '../../../pics/faq.png';

import Author from '../../author';

class FAQ extends Component{
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
            language:'en',
            loaded: false,
        }
    }

    componentDidMount() { 
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }

        if (typeof window !== "undefined") {
            window.onscroll = () => {
            let currentScrollPos = 500 - window.pageYOffset;

            this.setState({
                    opacity: currentScrollPos / 300
                    })  
            }
        }

        this.setState({
            language: lang,
            loaded:true
        })
    }

    render(){
        if (!this.state.loaded){
            return(
                <p>Loading</p>
            )
        }else{
            return(
                <div className="FAQ">
                    <div style={{textAlign:'center', maxHeight:'60vh', minHeight:'40%', overflow: 'hidden', marginTop:'-160px'}}>
                            <img  
                                style={{
                                    minHeight:'100%',
                                    minWidht:'100%',
                                    opacity: this.state.opacity
                                }}
                                width="100%"
                                src={banner}
                                alt="about-banner"
                                />
                        </div>
                    <div className="FAQ-page">
                        <div className="FAQ-section">
                            {texts[this.state.language].titles.map((p, index) => 
                                        <div key={index+"i"}>
                                            <h2 key={index}>
                                                {p}
                                            </h2> 
                                            <p key={index+"o"}>
                                                {texts[this.state.language].answers[index]}
                                            </p> 
                                        </div>
                            )}
                        </div>  

                    <Author />
                    </div>
                </div>
            )
        }
    }
}

export default FAQ;