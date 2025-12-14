"use server";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { PropertyType } from "@/types";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updateProperty(propertyId: string, formData: FormData) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User id is required");
  }

  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");

  const existingProperty = await Property.findById(propertyId);

  if (!existingProperty) throw new Error("No property is found with this id");

  if (existingProperty.owner.toString() !== userId)
    throw new Error("Current user is not authorized");

  const propertyData: PropertyType = {
    owner: userId,
    type: formData.get("type") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    location: {
      street: formData.get("location.street") as string,
      city: formData.get("location.city") as string,
      state: formData.get("location.state") as string,
      zipcode: formData.get("location.zipcode") as string,
    },
    beds: Number(formData.get("beds")),
    baths: Number(formData.get("baths")),
    square_feet: Number(formData.get("square_feet")),
    amenities: amenities as string[],
    rates: {
      weekly: formData.get("rates.weekly")
        ? Number(formData.get("rates.weekly"))
        : undefined,
      monthly: formData.get("rates.monthly")
        ? Number(formData.get("rates.monthly"))
        : undefined,
      nightly: formData.get("rates.nightly")
        ? Number(formData.get("rates.nightly"))
        : undefined,
    },
    seller_info: {
      name: formData.get("seller_info.name") as string,
      email: formData.get("seller_info.email") as string,
      phone: formData.get("seller_info.phone") as string,
    },
    images: existingProperty.images,
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );
  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
}
export default updateProperty;
