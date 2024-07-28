"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { signAccessToken, verifyAccessToken } from "@/lib/jwt";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

export async function reset(prevState: any, formData: FormData) {
	const schema = z
		.object({
			token: z.string().min(1, { message: "Token is required" }),
			password: z.string().min(8, { message: "Password Too Short" }),
			confirm_password: z.string().min(8, { message: "Password Too Short" }),
		})
		.refine((data) => data.password === data.confirm_password, {
			message: "Passwords don't match",
			path: ["confirm_password"],
		});
	const parse = schema.safeParse({
		token: formData.get("token"),
		password: formData.get("password"),
		confirm_password: formData.get("confirm_password"),
	});

	if (!parse.success) {
		return {
			success: false,
			message: `there is an error in your data ${parse.error.message}`,
			user: null,
		};
	}

	const token: any = await verifyAccessToken(parse.data.token);
	if (token === false || !token || !token.reset) {
		return {
			success: false,
			message: `error in jwt token`,
			user: null,
		};
	}
	parse.data.password = await bcrypt.hash(parse.data.password, 10);
	let [reset_user] = await db
		.update(user)
		.set({
			password: parse.data.password,
		})
		.where(eq(user.email, token.email))
		.returning();
	delete (reset_user as any)["password"];
	const user_token = await signAccessToken(reset_user);
	cookies().set("user", user_token);
	return {
		success: true,
		message: `password reset`,
		user: reset_user,
	};
}
