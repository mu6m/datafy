import { db } from "@/db";
import { task } from "@/db/schema";
import { and, count, eq } from "drizzle-orm";
import { verifyAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export const GET = async ({ request }: any) => {
	const searchParams = request.nextUrl.searchParams;
	const id: string = searchParams.get("id");

	const cookie = cookies().get("user");
	const token = await verifyAccessToken(cookie?.value);
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
	// fetch return the link from cloud storage
	return Response.json({ url: "" });
};

export const POST = async () => {
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
	const [pending] = await db
		.select({ count: count() })
		.from(task)
		.where(and(eq(task.userId, token.id), eq(task.state, "PENDING")));
	const [error] = await db
		.select({ count: count() })
		.from(task)
		.where(and(eq(task.userId, token.id), eq(task.state, "ERROR")));
	const [finished] = await db
		.select({ count: count() })
		.from(task)
		.where(and(eq(task.userId, token.id), eq(task.state, "FINISHED")));
	const items = await db.query.task.findMany({
		where: and(eq(task.userId, token.id), eq(task.state, "FINISHED")),
	});
	return Response.json({ pending, error, finished, items });
};
