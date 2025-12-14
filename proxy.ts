import type { NextRequest } from "next/server";
import auth from "next-auth/middleware";

export const proxy = auth;

export const config = {
  matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
