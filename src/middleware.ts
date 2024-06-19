import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./constants/routes";
import { TOKEN_KEY } from "./constants/common";

export function middleware(request: NextRequest) {
  let token = request.cookies.get(TOKEN_KEY)?.value || "";
  let pathname = request.nextUrl.pathname;

  const privateRoute = [ROUTES.BOOKS, ROUTES.DASHBOARD];
  const protectedRoute = [ROUTES.LOGIN];

  if (!token && privateRoute.includes(pathname)) {
    const response = NextResponse.redirect(new URL(`/login`, request.url));
    return response;
  }
  if (token && protectedRoute.includes(pathname)) {
    const response = NextResponse.redirect(new URL(`/dashboard`, request.url));
    return response;
  }
}
