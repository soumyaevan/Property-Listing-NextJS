"use client";
import deleteMessage from "@/app/actions/deleteMessage";
import markMessageRead from "@/app/actions/markMessageRead";
import useStore from "@/lib/store";
import { MessageType } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MessageCard = ({ message }: { message: MessageType }) => {
  const [mounted, setMounted] = useState(false);
  const [isRead, setIsRead] = useState(message.read);
  const { setUnreadMessageCount } = useStore();
  const handleReadClick = async () => {
    const isMessageRead = await markMessageRead(message._id as string);
    setIsRead(isMessageRead);
    setUnreadMessageCount((prev) => (isMessageRead ? prev - 1 : prev + 1));
    toast.success(`Message is marked as ${isMessageRead ? "read" : "unread"}`);
  };

  const handleDeleteMessage = async () => {
    await deleteMessage(message._id as string);
    setUnreadMessageCount((prev) => prev - 1);
    toast.success("Message is deleted");
  };
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="border border-gray-300 shadow-md dark:shadow-gray-600 p-4 mb-4 relative">
      {!isRead && (
        <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500 text-black rounded shadow-sm">
          New
        </div>
      )}
      <h2 className="text-lg mb-3 dark:text-gray-200 pt-5 md:pt-0">
        <span className="font-bold mr-2">Property Inquiry: </span>
        {typeof message.property === "object" && message.property?.name}
      </h2>
      <p className="text-gray-400 dark:text-gray-300 mb-3">{message.message}</p>
      <ul className="mb-3">
        <li className="mb-1 text-sm">
          <strong>Reply Email: </strong>
          <a href={`mailto: ${message.email}`} className="text-blue-400">
            {message.email}
          </a>
        </li>
        <li className="mb-1 text-sm">
          <strong>Reply Phone: </strong>
          <a href={`tel: ${message.phone}`} className="text-blue-400">
            {message.phone}
          </a>
        </li>
        <li className="mb-1 text-sm">
          <p>
            <strong>Received: </strong>
            {message.createdAt && new Date(message.createdAt).toLocaleString()}
          </p>
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mr-2 px-3 shadow py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-400 transition"
      >
        {isRead ? "Mark As Unread" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteMessage}
        className="px-3 shadow py-1 text-sm bg-red-500 text-white rounded hover:bg-red-400 transition"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
