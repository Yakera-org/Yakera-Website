import { useEffect, useState } from "react";
import api from "../services/api";
import TokenService from "../services/token";

const useGetRecipientProfile = (): any => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (TokenService.getLocalAccessToken()) {
      if (TokenService.isRecipient()) {
        // only allow recipients to this page
        getProfile();
      } else {
        // redirect donors to their page
        window.open("/profile");
      }
    } else {
      window.open("/login");
    }
  }, []);

  async function getProfile() {
    try {
      setProfile(await api.get("/profile"));
    } catch {
      TokenService.removeAccessToken();
      TokenService.removeRefreshToken();
      window.location.replace("/login");
    }
  }
  return profile;
};

export default useGetRecipientProfile;
