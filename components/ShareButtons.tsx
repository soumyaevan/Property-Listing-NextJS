"use client";
import { PropertyType } from "@/types";
import { Forward } from "lucide-react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const ShareButtons = ({ property }: { property: PropertyType }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-center font-bold text-xl mb-2">
        Share this property
      </h3>
      <div className="flex gap-2 items-center justify-center">
        <FacebookShareButton
          url={shareUrl}
          htmlTitle={property.name}
          hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={`${property.name} - ${property.type} for rent\n`}
          hashtags={[`#${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          url={shareUrl}
          title={`${property.name} - ${property.type} type property for rent`}
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={`${property.name} - ${property.type} type property for rent`}
          body={`${property.name} - ${property.type} type property for rent. Click the link below\n${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
