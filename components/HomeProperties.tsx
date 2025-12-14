import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import properties from "@/properties.json";
import { PropertyType } from "@/types";
import Link from "next/link";

const HomeProperties = async () => {
  await connectDB();
  const properties: PropertyType[] = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  // const listOfProperties = properties as PropertyType[];
  // const recentProperties = listOfProperties.slice(0, 3);
  return (
    <>
      <section className="px-4 py-6">
        <div className="container m-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Properties
          </h2>
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property: PropertyType) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p>No Properties</p>
          )}
        </div>
      </section>
      <section className="my-10 px-6 m-auto max-w-lg">
        <Link
          href="/properties"
          className="block py-4 px-6 bg-black dark:bg-white text-white rounded-xl hover:bg-gray-700 text-center dark:text-gray-900"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
