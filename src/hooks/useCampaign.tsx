import { useEffect, useState } from "react";
import api from "../services/api";

const useCampaign = (title: string): any => {
  const [campaign, setCampaign] = useState(null);
  const [acceptsZelle, setAcceptsZelle] = useState(false);
  useEffect(() => {
    async function getCampaign() {
      try {
        const campaign = (await api.get(`/campaigns/${title}`)).data.data;
        setCampaign(campaign);
        setAcceptsZelle(
          campaign?._user?.zelleInfo?.isAccepting &&
            campaign?._user?.zelleInfo?.name &&
            campaign?._user?.zelleInfo?.email
            ? true
            : false
        );
      } catch {
        //window.location.replace("/campaigns");
      }
    }
    getCampaign();
  }, [title]);

  return campaign ? { campaign, acceptsZelle } : {};
};

export default useCampaign;
