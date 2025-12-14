import { getSessionUser } from "@/utils/getSessionUser";
import Image from "next/image";
import profileDefault from "@/assets/images/profile.png";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { PropertyType } from "@/types";
import ProfileProperty from "@/components/ProfilePropertyElement";
const ProfilePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.user || !sessionUser.userId) {
    return <div>Please log in</div>;
  }
  const { user, userId } = sessionUser;

  const propertiesFromDB = await Property.find({ owner: userId }).lean();
  const properties = propertiesFromDB.map((property) => ({
    ...property,
    _id: property._id.toString(),
    owner: property.owner.toString(),
  }));
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  width={0}
                  height={0}
                  sizes="100vw"
                  src={user.image ? user.image : profileDefault}
                  alt="User"
                />
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span> {user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {user.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {properties.length > 0 ? (
                properties.map((property: PropertyType) => (
                  <ProfileProperty key={property._id} property={property} />
                ))
              ) : (
                <div>No properties listed under this user</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
