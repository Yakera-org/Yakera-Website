import React, { Component } from 'react';
import Author from '../../author';
import './terms.css';

var terms = "terms.html";

class Terms extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            localStorage.setItem("lang", "en");
        }
        if(lang === "en"){
            terms= "terms.html"
        }else{
            terms = "terms_sp.html"
        }

        this.setState({
            loaded: true
        })
    }
    
    render(){
        if(!this.state.loaded){
            return(
                <div>
                    Loading
                </div>
            )
        }else{
            return(
                <div>
                    <iframe src={"../" + terms}
                    title="terms"
                    className="terms-frame"/> 
                    <Author />    
                </div>      
            )
        }
    }
}

export default Terms;