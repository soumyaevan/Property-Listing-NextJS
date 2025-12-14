"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId: string) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User id is required");
  }
  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property not found!!!");

  if (property.owner.toString() !== userId)
    throw new Error("Unauthorized access is denied!!!");

  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split("/");
    return parts.at(-1)?.split(".").at(0);
  });

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      const result = await cloudinary.uploader.destroy(
        "propertyPulse/" + publicId
      );
      if (result.result !== "ok" && result.result !== "not found") {
        throw new Error(`Failed to delete image from Cloudinary: ${publicId}`);
      }
    }
  }

  const result = await property.deleteOne();
  if (result.deletedCount === 0) {
    throw new Error("Failed to delete the property");
  }

  revalidatePath("/", "layout");
}

export default deleteProperty;
