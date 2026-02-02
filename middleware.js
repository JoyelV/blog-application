import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"
import { NextResponse } from "next/server"

export default NextAuth(authConfig).auth((req) => {
    const isLoggedIn = !!req.auth;
    const { pathname } = req.nextUrl;

    // Check if user is on an admin route
    const isOnAdmin = pathname.startsWith("/admin");
    // Check if user is already on the login page to avoid loop
    const isLoginPage = pathname === "/admin/login";

    if (isOnAdmin) {
        if (isLoggedIn) {
            // If logged in and on login page, redirect to dashboard
            if (isLoginPage) {
                return NextResponse.redirect(new URL("/admin", req.nextUrl));
            }
            return null;
        }

        // If not logged in and not on login page, redirect to login
        if (!isLoginPage) {
            return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
        }
    }
    return null;
})

export const config = {
    matcher: ["/admin/:path*"],
}
