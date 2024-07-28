import { SignJWT, jwtVerify } from "jose";

export async function signAccessToken(payload: any) {
	const secret = new TextEncoder().encode(process.env.JWT_SECRET);
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.sign(secret);
}

export async function verifyAccessToken(token: any) {
	try {
		const secret = new TextEncoder().encode(process.env.JWT_SECRET);
		const { payload } = await jwtVerify(token, secret);
		return payload;
	} catch (error) {
		return false;
	}
}
