import React from "react";
import "./Donorhub.scss";
const imagePlaceholder = "https://assets.yakera.org/yakera/yakera-y-7.png"; //in case no profile picture is found
function DonorHubStats(props) {
  const EN = props.EN;

  const user = props.user;
  const userStats = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    location: user?.donorInfo?.location || "",
    bio: user?.donorInfo?.bio || "",
    age: user?.donorInfo?.age || "",
    profilePicture: user?.profilePicture || "",
  };

  return (
    <div className="donorhub-stats">
      <div className="user-img">
        <img
          src={
            userStats.profilePicture
              ? userStats.profilePicture
              : imagePlaceholder
          }
          alt="profile-pic"
          className="profile-pic"
        />
      </div>
      <h2 className="name">
        {userStats.firstName} {userStats.lastName}
        {userStats.age ? "," : ""}
        <span id="grey" style={{ marginLeft: "3px" }}>
          {userStats.age}
        </span>
      </h2>
      <h6>{userStats.location}</h6>
      <hr />
      <p id="user-bio">
        {userStats.bio ? (
          userStats.bio
        ) : (
          <div>
            {EN ? "No Biography, add one " : "No hay una biografía, "}
            <a style={{ textDecoration: "underline" }} href="/profile/edit">
              {EN ? "here" : "agregar una"}.
            </a>
          </div>
        )}
      </p>
    </div>
  );
}

export default DonorHubStats;
