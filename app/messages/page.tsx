"use server";
import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { MessageType } from "@/types";
import { convertToSerializedObject } from "@/utils/converToObject";
import { getSessionUser } from "@/utils/getSessionUser";

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Login to continue");
  }
  const userId = sessionUser.userId;
  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages: MessageType[] = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializedObject(messageDoc);
    message.sender = convertToSerializedObject(messageDoc.sender);
    message.property = convertToSerializedObject(messageDoc.property);
    return message;
  });

  return (
    <section className="bg-blue-50 dark:bg-gray-700 py-8">
      <div className="m-auto container p-2">
        <div className="bg-white dark:bg-gray-900 px-4 py-8 rounded shadow-md">
          <h2 className="font-bold text-2xl mb-4">Your Messages</h2>
          {messages.length === 0 ? (
            <p>You don't have any message</p>
          ) : (
            messages.map((message) => (
              <MessageCard key={message._id} message={message} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
