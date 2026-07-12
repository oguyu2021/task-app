import {z} from "zod";

export const taskUpdateSchema = z.object({
	title: z
	.string()
	.trim()
	.min(1,"タイトルを入力してください。")
	.optional(),

	dueDate: z
	.string()
	.min(1, "期限を入力してください。")
	.optional(),

	completed: z
		.boolean()
		.optional(),
})