import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface CustomJwtPayload {
  role: string;
  isPayment: boolean;
}
// import { jwtDecode } from "jwt-decode";
export function middleware(request: NextRequest) {
  // const loginRoute = `${request.nextUrl.origin}/login`;
  const homeRoute = `${request.nextUrl.origin}`;
  // const dashboardRoute = `${request.nextUrl.origin}/dashboard`;
  const userRoutes = [
    "/travel",
    "/basic",
    "/lifestyle",
    "/mytop",
    "/talking-points",
    "/user-profile",
    "/profile-details",
    "/search-filter",
    "/saved-profile",
  ];

  const adminRoutes = [
    "/dashboard/admin",
    "/dashboard/admin/blogs",
    "/dashboard/admin/purchase",
    "/dashboard/admin/purchase/membership-plan",
  ];

  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  const userInfo = jwtDecode<CustomJwtPayload>(token as string);

  const currentPath = request.nextUrl.pathname;

  // Redirect based on role and route
  if (
    "role" in userInfo &&
    userInfo?.role !== "USER" &&
    userInfo?.isPayment === false &&
    userRoutes.some((e) => currentPath.startsWith(e))
  ) {
    // Prevent ADMIN from accessing /services
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }
  if (
    "role" in userInfo &&
    userInfo?.role !== "ADMIN" &&
    adminRoutes.some((e) => currentPath.startsWith(e))
  ) {
    // Prevent ADMIN from accessing /services
    return NextResponse.redirect(new URL(homeRoute, request.url));
  }

  // Allow the request to proceed if the token exists
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/travel",
    "/basic",
    "/lifestyle",
    "/mytop",
    "/talking-points",
    "/user-profile",
    "/saved-profile",
    "/profile-details",
    "/search-filter",
    "/dashboard/admin",
    "/dashboard/admin/blogs",
    "/dashboard/admin/purchase",
    "/dashboard/admin/purchase/membership-plan",
  ], // Apply middleware to the /services route
};

// matcher: [
//   "/travel", "/basic",  "/lifestyle", "/mytop",
//   "/talking-points", "/user-profile", "/saved-profile", "/profile-details", "/search-filter","/dashboard/admin","/dashboard/admin/blogs","/dashboard/admin/purchase",
//   "/dashboard/admin/purchase/membership-plan"

// ],

// [
//   "/travel", "/basic", "/lifestyle", "/mytop",
//   "/talking-points", "/user-profile", "/profile-details", "/search-filter","/saved-profile"
// ];
