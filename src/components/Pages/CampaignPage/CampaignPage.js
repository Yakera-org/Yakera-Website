import React from "react";
import useCampaign from "../../../hooks/useCampaign.tsx";
import useLanguage from "../../../hooks/useLanguage.tsx";
import HashLoader from "react-spinners/HashLoader";
import "./CampaignPage.css";
import CampaignPageVisual from "./CampaignPageVisual";
import PaymentVisual from "./PaymentVisual";
import Author from "../../author";

function CampaignPage(props) {
  const EN = useLanguage();
  const { campaign, acceptsZelle } = useCampaign(props.match.params.title);

  return (
    <div className="campaignPage">
      {!campaign ? (
        <div className="loader-wrapper">
          <HashLoader size={100} color={"#ea8737"} loading={true} />
        </div>
      ) : (
        <>
          <CampaignPageVisual
            campaign={campaign}
            EN={EN}
            isAcceptingZelle={acceptsZelle}
          />

          <hr />

          {/* Images gallery */}
          <div className="gallery" id="gallery">
            {campaign?.pictures.map((im, i) => (
              <img src={im.url} alt={"campaign-gallery-item"} key={i} />
            ))}
          </div>

          <hr />

          <PaymentVisual
            EN={EN}
            title={campaign?.title}
            slug={campaign?.slug}
            recipientName={campaign?._user?.zelleInfo?.name}
            recipientEmail={campaign?._user?.zelleInfo?.email}
            isAcceptingZelle={acceptsZelle}
          />

          <Author />
        </>
      )}
    </div>
  );
}

export default CampaignPage;
