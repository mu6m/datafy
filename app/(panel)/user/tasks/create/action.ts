"use server";

import { db } from "@/db";
import { column, task, taskStateEnum } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { verifyAccessToken } from "@/lib/jwt";
import axios from "axios";
import { and, count, eq, ne } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

const task_limit = 5;

export async function form(prevState: any, formData: FormData) {
	enum types {
		STRING = "STRING",
		NUMBER = "NUMBER",
		TIME = "TIME",
		BOOLEAN = "BOOLEAN",
	}
	const schema = z.object({
		title: z.string().min(1, { message: "title is required" }),
		rows: z.number().min(1).max(1_000),
		names: z
			.array(z.string().min(1, { message: "name is required" }))
			.nonempty(),
		types: z.array(z.nativeEnum(types)).nonempty(),
		texts: z
			.array(
				z.string().min(1, { message: "generate text is required" }).max(500)
			)
			.nonempty(),
	});
	const parse = schema.safeParse({
		title: formData.get("title"),
		rows: Number(formData.get("rows")),
		names: Array.from(formData.getAll("name")),
		types: Array.from(formData.getAll("type")),
		texts: Array.from(formData.getAll("generate")),
	});

	if (!parse.success) {
		return {
			success: false,
			message: `there is an error in your data ${parse.error.message}`,
		};
	}
	const cookie = cookies().get("user");
	const token: any = await verifyAccessToken(cookie?.value);
	if (token === false || !token) {
		return {
			success: false,
			message: `error in user token`,
		};
	}
	const [user_limit] = await db
		.select({ count: count() })
		.from(task)
		.where(and(eq(task.userId, token.id), eq(task.state, "PENDING")));
	if (user_limit.count >= task_limit) {
		return {
			success: false,
			message: `task limit exceeded`,
		};
	}
	try {
		await db.transaction(async (tx) => {
			const [result] = await tx
				.insert(task)
				.values({
					userId: token.id,
					title: parse.data.title,
					rows: parse.data.rows,
				})
				.returning({ id: task.id });
			let insert_arr: any = [];
			for (let index = 0; index < parse.data.names.length; index++) {
				insert_arr.push({
					taskId: result.id,
					type: parse.data.types[index],
					generate: parse.data.texts[index],
					name: parse.data.names[index],
				});
			}
			await tx.insert(column).values(insert_arr);
			await inngest.send({
				name: "generate",
				data: {
					id: result.id,
					columns: insert_arr,
				},
			});
		});
	} catch (error) {
		return {
			success: false,
			message: `error in db`,
		};
	}
	return {
		success: true,
		message: `task "${parse.data.title}" is created`,
	};
}
