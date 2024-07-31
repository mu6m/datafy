import {
	pgTable,
	uuid,
	text,
	timestamp,
	integer,
	pgEnum,
	uniqueIndex,
	json,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const taskStateEnum = pgEnum("task_state", [
	"ERROR",
	"PENDING",
	"FINISHED",
]);
export const columnTypeEnum = pgEnum("column_type", [
	"STRING",
	"NUMBER",
	"TIME",
	"BOOLEAN",
]);

// User table
export const user = pgTable("user", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: text("email").notNull().unique(),
	username: text("username").notNull().unique(),
	password: text("password").notNull(),
	name: text("name").array().notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date()),
});

// Task table
export const task = pgTable(
	"task",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		title: text("title").notNull(),
		rows: integer("rows").notNull(),
		state: taskStateEnum("state").default("PENDING").notNull(),
		userId: uuid("user_id")
			.notNull()
			.references(() => user.id),
		createdAt: timestamp("created_at").defaultNow(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => ({
		uniqueTaskIdGenerate: uniqueIndex("unique_task_user").on(
			table.userId,
			table.title
		),
	})
);

// Column table
export const column = pgTable(
	"column",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		name: text("name").notNull(),
		type: columnTypeEnum("type").default("STRING").notNull(),
		generate: text("generate").notNull(),
		taskId: uuid("task_id")
			.notNull()
			.references(() => task.id),
	},
	(table) => ({
		uniqueTaskIdGenerate: uniqueIndex("unique_task_id_generate").on(
			table.taskId,
			table.name
		),
	})
);

// Gen table
export const gen = pgTable("gen", {
	id: uuid("id").primaryKey().defaultRandom(),
	generate: json("generate").notNull(),
	taskId: uuid("task_id")
		.notNull()
		.references(() => task.id),
});

// Relations
export const genRelations = relations(gen, ({ one }) => ({
	task: one(task, {
		fields: [gen.taskId],
		references: [task.id],
	}),
}));

export const userRelations = relations(user, ({ many }) => ({
	tasks: many(task),
}));

export const taskRelations = relations(task, ({ one, many }) => ({
	user: one(user, {
		fields: [task.userId],
		references: [user.id],
	}),
	columns: many(column),
}));

export const columnRelations = relations(column, ({ one }) => ({
	task: one(task, {
		fields: [column.taskId],
		references: [task.id],
	}),
}));
