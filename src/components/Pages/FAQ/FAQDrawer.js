import React from "react";
import { Grid } from "@material-ui/core";
import FAQQuestion from "./FAQQuestion";

function FAQDrawer(props) {
  const title = props.title;
  const questions = props.questions;
  const answers = props.answers;
  const image = props.image;

  const yakeraFilesBase = "https://assets.yakera.org/yakera/";

  return (
    <div>
      <Grid container spacing={1} style={{ alignItems: "center" }}>
        <Grid item xs={12} sm={12}>
          <div className="banner-img-mweb">
            <img
              alt="banner-img"
              className="banner-img"
              src={yakeraFilesBase + image + ".webp"}
            />
          </div>
          <div className="drawer-title">{title}</div>
        </Grid>
        <div className="faq-question-area">
          {questions.map((question, i) => {
            return (
              <div key={i}>
                <FAQQuestion question={question} answer={answers[i]} />
              </div>
            );
          })}
        </div>
      </Grid>
    </div>
  );
}

export default FAQDrawer;
