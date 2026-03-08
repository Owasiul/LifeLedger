import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const ReactShare = () => {
  const Weburl = "https://life-ledger-client.vercel.app";
  return (
    <div className="flex flex-row gap-5">
      <LineShareButton url={Weburl}>
        <LineIcon size={50} round={true} />
      </LineShareButton>
      <FacebookShareButton url={Weburl}>
        <FacebookIcon size={50} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={Weburl}>
        <TwitterIcon size={50} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton url={Weburl}>
        <LinkedinIcon size={50} round={true} />
      </LinkedinShareButton>
    </div>
  );
};

export default ReactShare;
