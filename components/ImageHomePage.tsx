"use client";
import { CldImage } from "next-cloudinary";

const ImageHomePage = ({ image }: { image: string }) => {
  return (
    <CldImage
      width={0}
      height={0}
      src={image}
      sizes="100vw"
      className="object-cover h-auto w-full rounded-t-xl"
      alt="Description of my image"
      loading="lazy"
    />
  );
};

export default ImageHomePage;
