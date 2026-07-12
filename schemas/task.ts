import {z} from "zod";

export const taskSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "タイトルを入力してください。"),

	dueDate: z
		.string()
		.min(1, "期限を入力してください。"),
});

export type TaskInput = z.infer<typeof taskSchema>