import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { PropertyType } from "@/types";

const Properties = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; pageSize?: string }>;
}) => {
  const { page = 1, pageSize = 3 } = await searchParams;
  const skip = (Number(page) - 1) * Number(pageSize);

  await connectDB();

  const totalProperties = await Property.countDocuments({});

  const showPagination = totalProperties > Number(pageSize);

  const properties: PropertyType[] = await Property.find({})
    .skip(skip)
    .limit(Number(pageSize));
  // const listOfProperties = properties as PropertyType[];
  return (
    <section className="px-4 py-6">
      <div className="container m-auto px-4 py-6">
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
      {showPagination && (
        <Pagination
          page={Number(page)}
          pageSize={Number(pageSize)}
          totalItems={Number(totalProperties)}
        />
      )}
    </section>
  );
};

export default Properties;
