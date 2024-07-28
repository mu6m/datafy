import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "@/lib/jwt";
export async function middleware(request: NextRequest) {
	const cookie = cookies().get("user");
	const session = cookies().get("user-storage");
	if (!cookie?.value && session?.value) {
		const response = NextResponse.redirect(new URL("/", request.url));

		response.cookies.delete("user");
		response.cookies.delete("user-storage");

		return response;
	}

	if (request.nextUrl.pathname.split("/")[1] == "user") {
		const token = await verifyAccessToken(cookie?.value);
		if (token === false || !token) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}
	}
}
