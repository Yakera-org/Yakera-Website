import React from 'react'
import { Grid } from '@material-ui/core';
import FAQQuestion from './FAQQuestion';

function FAQDrawer(props) {
    
      const title = props.title
      const questions = props.questions
      const answers = props.answers
    return (
        <div>
            <Grid container spacing={1} style={{ alignItems:'flex-start'}}>
                <Grid item xs={12} sm={12} >
                    <div className='drawer-title'>{title}</div>
                </Grid>
                <div className='faq-question-area'>
                    {
                        questions.map((question, i) => {
                            return(
                                <div key={i}>
                                    <FAQQuestion
                                        question={question}
                                        answer={answers[i]}
                                        
                                    />
                                    {
                                        i === questions.length-1 ? '' : <hr style={{width:'90%', marginLeft:'5%'}}/>
                                    }
                                   
                                </div>
                                )
                        })



                    }
                </div>
            </Grid>
                  
      </div>
    )
}

export default FAQDrawer
