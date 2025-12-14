"use client";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmark from "@/app/actions/checkBookmark";
import { PropertyType } from "@/types";
import { BookmarkMinus, BookmarkPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookMarkButton = ({ property }: { property: PropertyType }) => {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmark(property._id as string).then((res) => {
      if (res.error) toast.error(res.error as string);
      if (res.isBookmarked) setIsBookmarked(true);
      setLoading(false);
    });
  }, [property._id, checkBookmark, userId]);

  const clickHandle = async () => {
    if (!userId) {
      toast.error("Login is required");
      return;
    }
    bookmarkProperty(property._id as string).then((res) => {
      if (res.error) return toast.error(res.error as string);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={clickHandle}
    >
      <BookmarkMinus className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={clickHandle}
    >
      <BookmarkPlus className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookMarkButton;
