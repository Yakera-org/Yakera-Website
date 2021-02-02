

import React, { Component } from 'react';

class Author extends Component{
    
    render(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            lang='en'
        }

        if(lang === "en"){
            return(
                <div className='author-page'>
                        <hr style={{width:'80%', marginLeft:'10%' }}/>
    
                        <div style={{textAlign:'center', padding:'20px'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>This page is developed by <b>Jang Belche</b> and <b>Louis Nicaud</b>
                            
                            <br />
    
                            Both are students and did work on this website in their free time
    
                            <br />
    
                            You can reach out to them <a style={{color:'grey'}} href="https://www.linkedin.com/in/jang-belche/">here (Jang)</a> and <a style={{color:'grey'}} href="https://www.linkedin.com/in/louis-nicaud/">here (Louis)</a>
                            </p>
    
                        </div>         
                </div>
           
            )
        }else{
            return(
                <div className='author-page'>
                        <hr style={{width:'80%', marginLeft:'10%' }}/>
    
                        <div style={{textAlign:'center', padding:'20px'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>Esta página fue desarrollada por <b>Jang Belche</b> y <b>Louis Nicaud</b>
                            
                            <br />
    
                            Ambos son estudiantes e hicieron este trabajo en este itio web durante su tiempo libre. 
    
                            <br />
    
                            Usted puede contactarlos <a style={{color:'grey'}} href="https://www.linkedin.com/in/jang-belche/">aquí (Jang)</a> y <a style={{color:'grey'}} href="https://www.linkedin.com/in/louis-nicaud/">aquí (Louis)</a>
                            </p>
    
                        </div>         
                </div>
           
            )
        }

       
    }
}

export default Author;