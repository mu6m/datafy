import { db } from "@/db";
import { column, task } from "@/db/schema";
import { eq, or, ilike, count, desc, and } from "drizzle-orm";
import { verifyAccessToken } from "@/lib/jwt";
import { cookies } from "next/headers";

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
	if (id) {
		const item = await db.query.task.findFirst({
			where: and(eq(task.id, id), eq(task.userId, token.id)),
			with: {
				columns: true,
			},
		});
		if (!item) {
			return Response.json(
				{
					success: false,
					message: `item not found`,
				},
				{
					status: 400,
				}
			);
		}
		return Response.json({ item });
	}
	//optimize this
	const [page_count] = await db
		.select({ count: count() })
		.from(task)
		.where(and(ilike(task.title, `%${search}%`), eq(task.userId, token.id)));
	const pages = Math.ceil(page_count.count / perPage);
	const items = await db.query.task.findMany({
		orderBy: desc(task.createdAt),
		offset: (currentPage - 1) * perPage,
		limit: perPage,
		with: {
			columns: true,
		},
		where: and(ilike(task.title, `%${search}%`), eq(task.userId, token.id)),
	});
	return Response.json({ items, pages });
};
