import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { PropertyType } from "@/types";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedProperties = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Login to continue");
  }
  const { userId } = sessionUser;
  const { bookmarks } = await User.findById(userId).populate("bookmarks");

  return (
    <section className="px-4 py-6">
      <div className="container m-auto">
        <h1 className="text-center text-3xl mb-8">Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <div className="px-2">
            <p className="text-center"> No saved properties</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookmarks.map((property: PropertyType) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedProperties;
