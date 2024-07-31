import { db } from "@/db";
import { user } from "@/db/schema";
import { verifyAccessToken } from "@/lib/jwt";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";
import { schema_email, schema_name, schema_username } from "./validate";

export const GET = async () => {
	const cookie = cookies().get("user");
	const token: any = await verifyAccessToken(cookie?.value);
	if (token === false || !token) {
		return Response.json(
			{
				success: false,
				message: `error in user token`,
			},
			{
				status: 400,
			}
		);
	}
	const [data] = await db.select().from(user).where(eq(user.id, token.id));
	return Response.json(data);
};

export const POST = async (request: any) => {
	const searchParams = request.nextUrl.searchParams;
	const type: any = searchParams.get("type");
	const data: any = await request.json();
	if (!type) {
		return Response.json({
			success: false,
			message: `type is required`,
		});
	}

	const cookie = cookies().get("user");
	const token: any = await verifyAccessToken(cookie?.value);
	if (token === false || !token) {
		return Response.json(
			{
				success: false,
				message: `error in user token`,
			},
			{
				status: 400,
			}
		);
	}
	let parse = undefined;
	switch (type) {
		case "name":
			parse = schema_name.safeParse({
				name: data.name,
			});
			if (!parse.success) {
				return Response.json(
					{
						success: false,
						message: `error in json data`,
					},
					{
						status: 400,
					}
				);
			}
			try {
				await db
					.update(user)
					.set({ name: [parse.data.name] })
					.where(eq(user.id, token.id));
			} catch {
				return Response.json(
					{
						success: false,
						message: `error in db`,
					},
					{
						status: 400,
					}
				);
			}
			break;
		case "username":
			parse = schema_username.safeParse({
				username: data.username,
			});
			if (!parse.success) {
				return Response.json(
					{
						success: false,
						message: `error in json data`,
					},
					{
						status: 400,
					}
				);
			}
			try {
				await db
					.update(user)
					.set({ username: parse.data.username })
					.where(eq(user.id, token.id));
			} catch {
				return Response.json(
					{
						success: false,
						message: `error in db`,
					},
					{
						status: 400,
					}
				);
			}
			break;
		default:
			return Response.json(
				{
					success: false,
					message: `choose the type`,
				},
				{
					status: 400,
				}
			);
	}
	return Response.json({
		success: true,
		message: `updated`,
	});
};
