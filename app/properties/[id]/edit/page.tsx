import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { PropertyType } from "@/types";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";

const PropertyEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await connectDB();
  const { id } = await params;
  if (!isValidObjectId(id)) {
    notFound();
  }

  const propertyFromDB = await Property.findById(id).lean();
  if (!propertyFromDB) {
    notFound();
  }

  const property = {
    ...propertyFromDB,
    _id: propertyFromDB._id.toString(),
    owner: propertyFromDB.owner.toString(),
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white shadow-md px-6 py-8 mb-4
        rounded-md m-4 md:m-0"
        >
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
