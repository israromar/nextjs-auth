import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/signin" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/forgot-password" ||
    path === "/reset-password";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // If the user has a valid session, allow them through
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/profile",
    "/edit-profile",
    "/home",
    "/verifyemail",
    "/forgot-password",
    "/reset-password",
  ],
};
