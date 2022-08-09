import React from "react";
import { Grid } from "@material-ui/core";
import useCollapse from "react-collapsed";

function FAQQuestion(props) {
  const question = props.question;
  const answer = props.answer;

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: false,
  });

  function arrow() {
    if (isExpanded) {
      return "↑";
    } else {
      return "↓";
    }
  }

  return (
    <Grid container spacing={1} style={{ alignItems: "flex-start" }}>
      <Grid item xs={12} sm={12}>
        <div className="drawer-question" {...getToggleProps()}>
          <div dangerouslySetInnerHTML={{ __html: question + arrow() }}></div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className="drawer-answer" {...getCollapseProps()}>
          <div dangerouslySetInnerHTML={{ __html: answer }}></div>
        </div>
      </Grid>
    </Grid>
  );
}

export default FAQQuestion;
