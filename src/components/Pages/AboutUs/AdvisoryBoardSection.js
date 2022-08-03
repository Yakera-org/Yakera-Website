import React from "react";
import { Grid } from "@material-ui/core";
import "./AboutUs.css";
import members from "./advisoryBoardMembers.json";

function AdvisoryBoardSection(props) {
  const EN = props.EN;
  return (
    <div className="about-us-team">
      <h1>{EN ? "Our Advisory Board" : "Nuestra Junta Consultiva"}</h1>
      <div className="about-us-team-pics">
        {members.members.map((member, i) => {
          return (
            <div key={i}>
              <Grid
                container
                spacing={0}
                direction="row"
                style={{ display: "flex" }}
                justifyContent="flex-end"
                alignItems="center"
              >
                <Grid item xs={12} sm={3} className="member-pic">
                  <div className="img-wrapper">
                    <img src={member.picture} alt="profile" />
                  </div>
                </Grid>
                <Grid item xs={12} sm={9} className="member-text">
                  <p id="name">{member.name}</p>
                  <label id="position">
                    {EN ? member.titles : member.titles_SP}
                  </label>

                  <br />

                  <p>{EN ? member.descriptions : member.descriptions_SP}</p>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdvisoryBoardSection;
