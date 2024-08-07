import { db } from "@/db";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { count, eq } from "drizzle-orm";
import { gen, task } from "@/db/schema";

export const generate = inngest.createFunction(
	{
		id: "generate",
		onFailure: async ({ event, error }) => {
			await db
				.update(task)
				.set({ state: "ERROR" })
				.where(eq(task.id, event.data.event.data.id));
		},
	},
	{ event: "generate" },
	async ({ event, step }: any) => {
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API!);
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
		const user_task = await db.query.task.findFirst({
			where: eq(task.id, event.data.id),
		});
		if (!user_task) {
			return { event, body: "Task Not Found" };
		}
		const chat = model.startChat();
		const prompt = `
				Generate an array of json objects based on the requirements:
				${event.data.columns
					.map((obj: any) => {
						return `Column name: ${obj.name}, type: ${obj.type}, Description: ${obj.generate}`;
					})
					.join("\n")}

				Note:
				- Return the json array only, no additional texts or comments
				- Generate 10 rows
		`;
		while (true) {
			const [rows] = await db
				.select({ count: count() })
				.from(gen)
				.where(eq(gen.taskId, event.data.id));
			if (rows.count >= user_task.rows) {
				await db
					.update(task)
					.set({ state: "FINISHED" })
					.where(eq(task.id, event.data.id));
				return { event, body: "Done" };
			}
			const ai_resp = await chat.sendMessage(prompt);
			const responseText = ai_resp.response.text();
			const responseJson = JSON.parse(responseText);
			await db.insert(gen).values(
				responseJson.map((item: any) => ({
					taskId: event.data.id,
					generate: item,
				}))
			);
		}
	}
);
