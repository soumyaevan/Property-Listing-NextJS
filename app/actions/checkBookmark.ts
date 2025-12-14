"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
async function checkBookmark(propertyId: string) {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error("You need to login to perform this action");
    }
    const { userId } = sessionUser;
    const user = await User.findById(userId);
    let isBookmarked = user.bookmarks.includes(propertyId);
    return { isBookmarked };
  } catch (error) {
    return { error };
  }
}
export default checkBookmark;
