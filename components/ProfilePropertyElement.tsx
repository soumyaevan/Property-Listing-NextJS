"use client";

import deleteProperty from "@/app/actions/deleteProperty";
import { PropertyType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { toast } from "react-toastify";

const ProfileProperty = ({ property }: { property: PropertyType }) => {
  const router = useRouter();
  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmed) return;
    const toastId = toast.loading("Loading...");
    try {
      await deleteProperty(propertyId);

      router.refresh();
      toast.update(toastId, {
        render: "Done!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Failed to delete property:", error);
      toast.update(toastId, {
        render: "Failed!",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  return (
    <div className="mb-10">
      <Link href={`properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          width={1000}
          height={200}
          alt="Property 1"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">Address: {property.location.street}</p>
      </div>
      <div className="mt-2">
        <a
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </a>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id as string)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProfileProperty;
