"use client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

const PropertyHeaderImage = ({ image }: { image: string }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          {/* <Image
            src={`/images/properties/${image}`}
            alt=""
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
          /> */}
          <CldImage
            width={0}
            height={0}
            src={image}
            sizes="100vw"
            className="object-cover h-[400px] w-full"
            alt="Description of my image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
