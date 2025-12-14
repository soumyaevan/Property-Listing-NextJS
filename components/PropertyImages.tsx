"use client";

import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <Gallery>
      <div className="mx-auto bg-blue-50">
        <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          {images.length > 0 ? (
            images.map((image, _idx) => (
              <Item
                key={_idx}
                original={image}
                thumbnail={image}
                width="1000"
                height="600"
              >
                {({ ref, open }) => (
                  <Image
                    ref={ref as any}
                    onClick={open}
                    width={1800}
                    height={400}
                    src={image}
                    className="object-cover h-auto w-full rounded shadow-md cursor-pointer"
                    alt="Property Image"
                  />
                )}
              </Item>
            ))
          ) : (
            <p>No other images available for this property</p>
          )}
        </div>
      </div>
    </Gallery>
  );
};

export default PropertyImages;
