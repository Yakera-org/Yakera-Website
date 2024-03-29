import React from "react";
import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import login from "./Pages/Login/Login";
import register from "./Pages/Register/RegisterPage";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPasswordPage";
import ResetPassword from "./Pages/ResetPassword/ResetPasswordPage";
import home from "./Pages/Home/home";
import Campaign from "./Pages/CampaignPage/CampaignPage";
import Terms from "./Pages/Terms/terms";
import FAQ from "./Pages/FAQ/FAQPage";
import Campaigns from "./Pages/Campaigns/Campaigns";
import AboutUs from "./Pages/AboutUs/AboutUs";
import NotFoundPage from "./Pages/404/NotFoundPage";
import CreateCampaign from "./Pages/CreateCampaignPage/CreateCampaign";
import EmailVerification from "./Pages/EmailVerification/EmailVerificationPage";
import ProfileEditPage from "./Pages/Profile/EditPage/EditPage";
import Profile from "./Pages/Profile/Profile";
import SuccessStories from "./Pages/SuccessStories/SuccessStories";
import useLanguageFromGeoLocation from "../hooks/useLanguageFromGeoLocation";

function Main() {
  const fetchedLanguage = useLanguageFromGeoLocation();

  if (!fetchedLanguage) {
    return "";
  } else {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/login" component={login} />
            <Route exact path="/register" component={register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/campaigns" component={Campaigns} />
            <Route exact path="/create-campaign" component={CreateCampaign} />
            <Route exact path="/about" component={AboutUs} />
            <Route exact path="/success" component={SuccessStories} />
            <Route exact path="/campaign/:title" component={Campaign} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/frequently-asked-questions" component={FAQ} />
            <Route exact path="/profile/edit" component={ProfileEditPage} />
            <Route exact path="/verify-email" component={EmailVerification} />
            <Route exact path="/" component={home} />
            <Route path="/404" component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Main;
