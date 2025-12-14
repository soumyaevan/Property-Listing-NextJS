import connectDB from "@/config/database";
import Property from "@/models/Property";
import { PropertyType } from "@/types";
import FeaturedPropertyCard from "./FeaturedPropertyCard";

const FeaturedProperties = async () => {
  await connectDB();
  const featuredProp: PropertyType[] = await Property.find({
    is_featured: true,
  }).lean();

  return featuredProp.length > 0 ? (
    <section className="px-4 py-6">
      <div className="container m-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Today's Feature
        </h2>
        <div className="flex justify-center">
          <div
            className={`grid gap-6 w-full ${
              featuredProp.length === 1
                ? "max-w-xl grid-cols-1"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {featuredProp.map((property) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedProperties;
