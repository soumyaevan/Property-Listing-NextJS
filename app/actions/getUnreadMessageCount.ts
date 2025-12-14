"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnreadMsgCount() {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      throw new Error("You need to login to perform this action");
    }
    const { userId } = sessionUser;
    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });
    return count;
  } catch (err) {
    throw new Error(err as string);
  }
}
export default getUnreadMsgCount;
