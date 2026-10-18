import NextAuth from "next-auth";
import { authConfig } from "./lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/owner")) return NextResponse.next();
  const isPublic = pathname === "/owner/login" || pathname === "/owner/setup";
  if (isPublic) return NextResponse.next();
  if (!req.auth) return NextResponse.redirect(new URL("/owner/login", req.url));
  return NextResponse.next();
});

export const config = { matcher: ["/owner/:path*"] };