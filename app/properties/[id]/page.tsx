// client component
// "use client";
// import {
//   useParams,
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from "next/navigation";

import BookMarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { PropertyType } from "@/types";
import { isValidObjectId } from "mongoose";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
// const PropertyDetailPage = () => {
//   const router = useRouter();
//   const pathParams = useParams();
//   const queryParams = useSearchParams();
//   const pathName = usePathname();
//   console.log(router);
//   return (
//     <div>
//       Property details {pathParams.id}
//       <br />
//       Query params {queryParams.get("name")}
//       <br />
//       Pathname: {pathName}
//     </div>
//   );
// };

// server component
const PropertyDetailPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  // const query = await searchParams;
  if (!isValidObjectId(id)) {
    notFound();
  }
  await connectDB();
  const property: PropertyType = await Property.findById(id).lean();
  if (!property) {
    notFound();
  }
  const propertySerialized = {
    ...property,
    _id: (property._id as string).toString(),
    owner: (property.owner as string).toString(),
  };
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2"></FaArrowLeft> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
            <aside className="space-y-4">
              <BookMarkButton property={propertySerialized} />
              <ShareButtons property={propertySerialized} />
              <PropertyContactForm property={propertySerialized} />
            </aside>
          </div>
        </div>
        <PropertyImages images={property.images} />
      </section>
    </>
  );
};

export default PropertyDetailPage;
