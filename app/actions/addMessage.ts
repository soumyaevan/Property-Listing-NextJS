"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { MessageType } from "@/types";
import { getSessionUser } from "@/utils/getSessionUser";

export type AddMessageState = {
  submitted: boolean;
  error?: string;
};

async function addMessage(
  prevState: AddMessageState,
  formData: FormData
): Promise<AddMessageState> {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return { submitted: false, error: "User needs to login" };
    }

    const { userId } = sessionUser;
    const recipient = formData.get("recipient");

    if (!recipient) {
      return { submitted: false, error: "No sender is specified" };
    }

    if (userId === recipient)
      return {
        submitted: false,
        error: "You can not send message to yourself",
      };

    const property = formData.get("property");

    const payload: MessageType = {
      sender: userId,
      recipient: recipient as string,
      property: property as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    const newMessage = new Message(payload);
    await newMessage.save();
    return { submitted: true };
  } catch (error) {
    return { error: "Unexpected error", submitted: false };
  }
}
export default addMessage;
