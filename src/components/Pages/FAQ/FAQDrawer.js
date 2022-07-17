import React from 'react'
import { Grid } from '@material-ui/core';
import FAQQuestion from './FAQQuestion';

function FAQDrawer(props) {
      const title = props.title
      const questions = props.questions
      const answers = props.answers
      const image = props.image

      const aboutYakera = "https://yakera-files.s3.us-east-2.amazonaws.com/yakera/aboutYakera.webp";
      const createCampaign = "https://yakera-files.s3.us-east-2.amazonaws.com/yakera/createCampaign.webp";
      const withdrawing = "https://yakera-files.s3.us-east-2.amazonaws.com/yakera/withdrawing.webp";
      const supportUs = "https://yakera-files.s3.us-east-2.amazonaws.com/yakera/supportUs.webp";

      const nameToImage = {
        "aboutYakera": aboutYakera,
        "createCampaign": createCampaign,
        "withdrawing": withdrawing,
        "supportUs": supportUs,
      }

    return (
        <div>
            <Grid container spacing={1} style={{ alignItems:'center'}}>
                <Grid item xs={12} sm={12} >
                    <div className='banner-img-mweb'><img alt='banner-img' className="banner-img" src={nameToImage[image]}/></div>
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
