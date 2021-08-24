import React from 'react'
import { Grid } from '@material-ui/core';
import useCollapse from 'react-collapsed';

function FAQQuestion(props) {
    const question=props.question
    const answer=props.answer

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
        defaultExpanded: false,
      });

    return (
        <Grid container spacing={1} style={{ alignItems:'flex-start'}}>
            <Grid item xs={12} sm={12} >
                <div className='drawer-question' {...getToggleProps()}>
                    {question} {isExpanded ? '↑' : '↓'}
                </div>
            </Grid>
            <Grid item xs={12} sm={12} >
                <div className='drawer-answer' {...getCollapseProps()}>
                    {isExpanded ? answer : ''}
                </div>
            </Grid>
        </Grid>
    )
}

export default FAQQuestion
