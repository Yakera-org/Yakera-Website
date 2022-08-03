import React, { useState } from "react";
import { Dialog, Grid } from "@material-ui/core";
import { Navbar, Container, Nav } from "react-bootstrap";
import AuthBadge from "./AuthBadge";
import DonateCard from "./DonateCard";

const comment_pics = [
  "https://assets.yakera.org/yakera/profile-icon-1.webp",
  "https://assets.yakera.org/yakera/profile-icon-2.webp",
  "https://assets.yakera.org/yakera/profile-icon-3.webp",
  "https://assets.yakera.org/yakera/profile-icon-4.webp",
  "https://assets.yakera.org/yakera/profile-icon-5.webp",
];
for (let i = comment_pics.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [comment_pics[i], comment_pics[j]] = [comment_pics[j], comment_pics[i]];
}

function CampaignPageVisual(props) {
  const [showDetailedImage, setShowDetailedImage] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  const EN = props.EN;
  const campaign = props.campaign;
  const amount = campaign?.raised + campaign?.zelleRaised;
  const target = campaign?.targetAmount;
  const donations = campaign?.donations
    .filter((campaign) => campaign)
    .slice()
    .reverse();
  let title, story;

  const categories = {
    small_business: EN ? "Small business" : "Pequeños negocios",
    healthcare: EN ? "Healthcare" : "Salud",
    education: EN ? "Education" : "Educación",
    nutrition: EN ? "Nutrition" : "Slimentación",
  };

  const category = categories[campaign?.category];
  const mainPicture = campaign?.mainPicture?.url;

  try {
    title = campaign.translations[EN ? "en" : "sp"].title;
    story = campaign.translations[EN ? "en" : "sp"].story;
  } catch (err) {
    title = campaign.title;
    story = campaign.story;
  }

  function switchDetailedImage() {
    setShowDetailedImage(!showDetailedImage);
  }
  function switchShowShare() {
    setShowShareCard(!showShareCard);
  }
  function onClickScroll(id) {
    let element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
  return (
    <div className="camp-page-vis">
      <h3 id={campaign?.category}>{category}</h3>
      <h1 style={{ color: "var(--brand-blue" }}>{title}</h1>
      <Grid container spacing={4} style={{ alignItems: "flex-start" }}>
        <Grid item xs={12} sm={8} id="left-col">
          {/* left column  */}
          <div
            className="campaign-page-title-img"
            style={{
              borderRadius: "5px",
            }}
          >
            <img
              style={{
                borderRadius: "5px",
              }}
              src={mainPicture}
              alt="main thumb"
              onClick={switchDetailedImage}
            />
            <Dialog
              fullWidth={true}
              maxWidth="lg"
              open={showDetailedImage}
              onClose={switchDetailedImage}
            >
              <img
                id="exp-img"
                onClick={switchDetailedImage}
                src={mainPicture}
                alt="main thumb"
              />
            </Dialog>
          </div>

          <p id="author-credit">
            {campaign._user.firstName} {campaign._user.lastName}-{" "}
            {new Date(campaign.createdAt).toLocaleDateString()}
          </p>

          <Navbar>
            <Container style={{ justifyContent: "center" }}>
              <Nav className="camp-page-navbar">
                <Nav.Link
                  href="#1"
                  onClick={() => {
                    onClickScroll("about");
                  }}
                >
                  {EN ? "About" : "Sobre"}
                </Nav.Link>
                <Nav.Link
                  href="#2"
                  onClick={() => {
                    onClickScroll("gallery");
                  }}
                >
                  {EN ? "Gallery" : "Galería"}
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>

          <div className="camp-page-story" id="about">
            <p dangerouslySetInnerHTML={{ __html: story }} />
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* right column  */}
          <div>
            <AuthBadge EN={EN} />
          </div>
          <div style={{ width: "100%" }}>
            <DonateCard
              amount={amount}
              target={target}
              showShare={showShareCard}
              onShare={switchShowShare}
              onClose={switchShowShare}
              onDonate={onClickScroll}
              EN={EN}
              isAcceptingZelle={props.isAcceptingZelle}
            />
          </div>
          <div className="comment-section">
            <h2>{EN ? "Recent donations" : "Donaciones recientes"}</h2>
            <div>
              {donations.length === 0 ? (
                <p style={{ fontSize: "18px" }}>
                  {" "}
                  {EN
                    ? "No donations submitted. Be the first one!"
                    : "Sin donaciones aún. ¡Sé el primero!"}
                </p>
              ) : (
                donations.map((donation, i) => {
                  if (i < 5) {
                    var name;
                    var amount = donation.amount;
                    var comment = donation.comment;
                    var isAnon = donation.isAnonymous;
                    var pic_url = comment_pics[i];

                    if (isAnon) {
                      name = EN ? "Anonymous" : "Anónimo";
                    } else {
                      name = donation.name;
                    }

                    return (
                      <Grid
                        key={i}
                        container
                        spacing={0}
                        className="ind-comment"
                        style={{ justifyContent: "center" }}
                      >
                        <Grid item xs={3} sm={2} className="img-wrapper">
                          <img src={pic_url} alt="comment-profile" />
                        </Grid>
                        {comment ? (
                          <Grid item xs={9} sm={10}>
                            <div className="cmt-wrapper">
                              <h3 className="name">
                                {name}, ${amount}
                              </h3>
                              <p className="comment">{comment}</p>
                            </div>
                          </Grid>
                        ) : (
                          <Grid item xs={9} sm={10}>
                            <div className="cmt-wrapper">
                              <h3 className="name">
                                {name}, ${amount}
                              </h3>
                            </div>
                          </Grid>
                        )}
                      </Grid>
                    );
                  } else return "";
                })
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default CampaignPageVisual;
