"use client";

import getUnreadMsgCount from "@/app/actions/getUnreadMessageCount";
import useStore from "@/lib/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Notification = () => {
  const unreadMessageCount = useStore((s) => s.unreadMessageCount);
  const setUnreadMessageCount = useStore((s) => s.setUnreadMessageCount);
  const { data: session } = useSession();
  useEffect(() => {
    async function load() {
      const count = await getUnreadMsgCount();
      setUnreadMessageCount(count);
    }
    if (session && session.user) {
      load();
    }
  }, [setUnreadMessageCount, session]);
  return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
      {unreadMessageCount}
    </span>
  );
};

export default Notification;
