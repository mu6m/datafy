import { db } from "@/db";
import { gen, task } from "@/db/schema";
import { and, count, eq } from "drizzle-orm";
import { verifyAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

//in get stream the response
export const GET = async (request: any, params: any) => {
	const searchParams = request.nextUrl.searchParams;
	const id: string = searchParams.get("id");

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
	if (!id) {
		return Response.json(
			{
				success: false,
				message: `id is required`,
			},
			{
				status: 400,
			}
		);
	}
	const user_task = await db.query.task.findFirst({
		where: and(eq(task.id, id), eq(task.userId, token.id)),
	});
	if (!user_task || user_task.state != "FINISHED") {
		return Response.json(
			{
				success: false,
				message: `error in item`,
			},
			{
				status: 400,
			}
		);
	}
	const generated = await db.query.gen.findMany({
		columns: {
			generate: true,
		},
		where: eq(gen.taskId, id),
	});
	return Response.json(generated);
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
