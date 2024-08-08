import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "./lib/jwt";
export async function middleware(request: NextRequest) {
	const cookie = cookies().get("user");
	const token = await verifyAccessToken(cookie?.value);
	if (token === false || !token) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}
}

export const config = {
	matcher: ["/user/:path*"],
};
