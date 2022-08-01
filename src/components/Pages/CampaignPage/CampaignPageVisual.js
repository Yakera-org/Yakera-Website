import React, { Component } from "react";
import { Dialog, Grid } from "@material-ui/core";
import DonateCard from "./DonateCard";
import { capitalizeFirstLetter } from "../../../stringUtils";
import { Navbar, Container, Nav } from "react-bootstrap";
import getHumanReadableDate from "../../../dateUtils";

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

const CampaignCategory = ({ categoryType }) => {
  return (
    <h3
      style={{
        color:
          categoryType === "education" || categoryType === "educación"
            ? "#70b88f"
            : categoryType === "healthcare" || categoryType === "salud"
            ? "#ff7d7d"
            : categoryType === "small business" ||
              categoryType === "pequeños negocios"
            ? "#0e325e"
            : categoryType === "nutrition" || categoryType === "alimentación"
            ? "#edc343"
            : "",
      }}
    >
      {capitalizeFirstLetter(categoryType)}
    </h3>
  );
};

const categories = {
  en: {
    small_business: "small business",
    healthcare: "healthcare",
    education: "education",
    nutrition: "nutrition",
  },
  es: {
    small_business: "pequeños negocios",
    healthcare: "salud",
    education: "educación",
    nutrition: "alimentación",
  },
};

var marginOffset = 50;

class CampaignPageVisual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marginCard: marginOffset,
      showShare: false,
      imgClicked: false,
    };
    this.onShare = this.onShare.bind(this);
    this.onDonate = this.onDonate.bind(this);
    this.imgClick = this.imgClick.bind(this);
  }

  imgClick() {
    this.setState({
      imgClicked: !this.state.imgClicked,
    });
  }

  onShare() {
    this.setState({
      showShare: !this.state.showShare,
    });
  }

  onDonate() {
    var element = document.getElementById("donateRef");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  onClickScroll(id) {
    let element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(max-width: 600px)");
      window.onscroll = () => {
        let offset = marginOffset;
        let currentScrollPos = window.pageYOffset;

        if (document.getElementById("left-col")) {
          var lowerBoundary =
            document.getElementById("left-col").offsetHeight - 800;
        }

        if (currentScrollPos > lowerBoundary) {
          currentScrollPos = lowerBoundary;
        }
        if (!mql.matches) {
          this.setState({
            marginCard: currentScrollPos + offset,
          });
        } else {
          this.setState({
            marginCard: 0,
          });
        }
      };
    }
  }

  render() {
    var EN = true;
    const language = this.props.language;

    if (language === "en") {
      EN = true;
    } else {
      EN = false;
    }
    const campaign = this.props.campaign;
    const amount = this.props.amount;
    const target = campaign?.targetAmount;
    const donations = campaign.donations.slice().reverse();
    let title, story, mainPicture, category;

    try {
      category = categories[language][campaign.category];
    } catch (err) {
      category = campaign.category;
    }
    try {
      mainPicture = campaign.mainPicture.url;
    } catch {
      mainPicture = "";
    }

    try {
      title = campaign.translations[language].title;
      story = campaign.translations[language].story;
    } catch (err) {
      title = campaign.title;
      story = campaign.story;
    }
    return (
      <div className="camp-page-vis">
        <CampaignCategory categoryType={category} />
        <h1 style={{ color: "var(--brand-blue" }}>{title}</h1>
        <Grid container spacing={4} style={{ alignItems: "flex-start" }}>
          <Grid item xs={12} sm={8} id="left-col">
            {/* left column  */}
            {/* <hr />*/}
            <div
              className="campaign-page-title-img"
              style={{
                borderRadius: "20px",
              }}
            >
              <img
                onClick={this.imgClick}
                style={{
                  borderRadius: "20px",
                }}
                src={mainPicture}
                alt="title.img"
              />
              <Dialog
                fullWidth={true}
                maxWidth="lg"
                open={this.state.imgClicked}
                onClose={this.imgClick}
              >
                <img
                  id="exp-img"
                  onClick={this.imgClick}
                  src={mainPicture}
                  alt="title.img"
                />
              </Dialog>
            </div>

            <p id="author-credit">
              {capitalizeFirstLetter(campaign._user.firstName)}{" "}
              {capitalizeFirstLetter(campaign._user.lastName)} -{" "}
              {getHumanReadableDate(campaign.createdAt)}
            </p>

            {/* <hr style={{marginBottom:'-10px'}}/> */}

            <Navbar>
              <Container style={{ justifyContent: "center" }}>
                <Nav className="camp-page-navbar">
                  <Nav.Link
                    href="#1"
                    onClick={() => {
                      this.onClickScroll("about");
                    }}
                  >
                    {EN ? "About" : "Sobre"}
                  </Nav.Link>
                  <Nav.Link
                    href="#2"
                    onClick={() => {
                      this.onClickScroll("gallery");
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
            <div
              style={{ marginTop: this.state.marginCard + "px", width: "100%" }}
            >
              <DonateCard
                amount={amount}
                target={target}
                showShare={this.state.showShare}
                onShare={this.onShare}
                onClose={this.onShare}
                onDonate={this.onClickScroll}
                language={language}
                isAcceptingZelle={this.props.isAcceptingZelle}
              />
            </div>
            <div className="comment-section">
              <h2>{EN ? "Recent donations" : "Donaciones recientes"}</h2>
              <div>
                {campaign.donations.length === 0 ? (
                  <p>
                    {" "}
                    {EN
                      ? "No donations submitted. Be the first one!"
                      : "Sin donaciones aún. ¡Sé el primero!"}
                  </p>
                ) : (
                  donations
                    .filter((d) => d !== null)
                    .map((donation, i) => {
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
}

export default CampaignPageVisual;
