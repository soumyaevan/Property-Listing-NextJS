import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { PropertyType } from "@/types";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";

const SearchResultPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  try {
    await connectDB();
    const params = await searchParams;
    const { location = "", propertyType = "All" } = params;
    const locationPattern = new RegExp(location, "i");
    let query: { $or: Array<Record<string, RegExp>>; type?: RegExp } = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    if (propertyType && propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const propertyResults = await Property.find(query).lean();
    const properties = propertyResults.map((property: PropertyType) => ({
      ...property,
      _id: property._id?.toString(),
      owner: property.owner?.toString(),
    }));

    return (
      <>
        <section className="bg-blue-700">
          <div className="py-4 px-6 md:px-8">
            <PropertySearchForm />
          </div>
        </section>
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-center font-bold text-3xl mb-6">
              Property Search Results
            </h1>
            <Link
              href="/properties"
              className="text-blue-500 flex items-center mb-6 hover:text-blue-800 transition"
            >
              <ArrowLeftCircle className="mr-1" /> Back to all Properties
            </Link>
            {properties && properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property: PropertyType) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="px-4 py-4 rounded shadow-md bg-gray-300">
                <p className="text-center">No properties found</p>
              </div>
            )}
          </div>
        </section>
      </>
    );
  } catch (error) {
    return (
      <section className="px-4 py-6">
        <div className="container m-auto">
          <h1 className="text-center font-bold text-3xl mb-6">Error</h1>
          <div className="px-4 py-4 rounded shadow-md bg-red-100">
            <p className="text-center">Failed to load search results</p>
          </div>
        </div>
      </section>
    );
  }
};

export default SearchResultPage;
