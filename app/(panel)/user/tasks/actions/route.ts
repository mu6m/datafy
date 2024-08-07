//this might have diff actions so we use switch
import { db } from "@/db";
import { column, task } from "@/db/schema";
import { eq, or, ilike, count, desc, and } from "drizzle-orm";
import { verifyAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { inngest } from "@/inngest/client";

const perPage = 10;

export const GET = async (request: any, params: any) => {
	const searchParams = request.nextUrl.searchParams;
	const search: string = searchParams.get("q") || "";
	const id: string = searchParams.get("id");
	const currentPage: number = Number(searchParams.get("page")) || 1;

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
	const item = await db.query.task.findFirst({
		where: and(eq(task.id, id), eq(task.userId, token.id)),
		with: {
			columns: true,
		},
	});
	if (!item || item.state != "ERROR") {
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
	await inngest.send({
		name: "generate",
		data: {
			id: item.id,
			columns: item.columns,
		},
	});
	await db.update(task).set({ state: "PENDING" }).where(eq(task.id, item.id));
	return Response.json({ item });
};
