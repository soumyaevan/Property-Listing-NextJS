import connectDB from "@/config/database";
import Property from "@/models/Property";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { message: "Invalid Property ID!!!" },
        {
          status: 400,
        }
      );
    }
    await connectDB();
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { message: "Property is not found!!!" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!!!", error },
      {
        status: 500,
      }
    );
  }
};
