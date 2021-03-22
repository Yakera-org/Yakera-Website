

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
                        <div style={{textAlign:'center'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>Yakera Inc. is registered as a tax-exempt 501(c)(4) organization. 
                            <br />
                            Please note that under our status as 501(c)(4) we are a non for profit organization devoted to social welfare, but donations made to us are not tax deductible.
                            </p>
    
                        </div>  

                        <hr style={{width:'80%', marginLeft:'10%' }}/>

    
                        <div style={{textAlign:'center', padding:'20px'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>This page is developed by <b>Jang Belche</b> and <b>Louis Nicaud</b>
                            
                            <br />
    
                            Both are students and did work on this website in their free time
    
                            <br />
    
                            You can reach out to them <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/jang-belche/">here (Jang)</a> and <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/louis-nicaud/">here (Louis)</a>
                            </p>
    
                        </div>         
                </div>
           
            )
        }else{
            return(
                <div className='author-page'>
                        <hr style={{width:'80%', marginLeft:'10%' }}/>

                        <div style={{textAlign:'center'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>Yakera Inc. está resistrada como una organización 501(c)(4) exenta de impuestos.
                            <br />
                             Note por favor, que bajo nuestro estatus como 501(c)(4) somos una organización sin fines de lucro dedicada al bienestar social, pero las donaciones que recibimos no son deducibles de impuestos.
                            </p>
    
                        </div>  

                        <hr style={{width:'80%', marginLeft:'10%' }}/>
    
                        <div style={{textAlign:'center', padding:'20px'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>Esta página fue desarrollada por <b>Jang Belche</b> y <b>Louis Nicaud</b>
                            
                            <br />
    
                            Ambos son estudiantes e hicieron este trabajo en este sitio web durante su tiempo libre. 
    
                            <br />
    
                            Usted puede contactarlos <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/jang-belche/">aquí (Jang)</a> y <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/louis-nicaud/">aquí (Louis)</a>
                            </p>
    
                        </div>         
                </div>
           
            )
        }

       
    }
}

export default Author;