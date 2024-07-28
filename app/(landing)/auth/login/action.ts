"use server";

import { signAccessToken, verifyAccessToken } from "@/lib/jwt";
import { db } from "@/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { z } from "zod";
import { or, eq } from "drizzle-orm";
import { user } from "@/db/schema";

export async function login(prevState: any, formData: FormData) {
	const schema = z.object({
		user: z.string().min(1, { message: "username/email is required" }),
		password: z.string().min(8, { message: "Password Too Short" }),
	});
	const parse = schema.safeParse({
		user: formData.get("user"),
		password: formData.get("password"),
	});

	if (!parse.success) {
		return {
			success: false,
			message: `there is an error in your data ${parse.error.message}`,
			user: null,
		};
	}

	let [login_user] = await db
		.select()
		.from(user)
		.where(
			or(eq(user.username, parse.data.user), eq(user.email, parse.data.user))
		)
		.limit(1);
	if (!login_user) {
		return {
			success: false,
			message: `user not found`,
			user: null,
		};
	}
	const result = await bcrypt.compare(parse.data.password, login_user.password);
	if (!result) {
		return {
			success: false,
			message: `password is wrong`,
			user: null,
		};
	}
	delete (login_user as any)["password"];
	const user_token = await signAccessToken(login_user);
	cookies().set("user", user_token);
	return {
		success: true,
		message: `user created`,
		user: login_user,
	};
}
