import { Task } from "@/types/task";

type TaskCardProps = {
	task: Task;
	onDelete: (id: number) => void;
	onEdit: (task: Task) => void;
};

export default function TaskCard({
	task,
	onEdit,
	onDelete,
}: TaskCardProps) {
	return (
		<div className="rounded-lg border p-4 shadow-sm">
			<h2 className="text-lg font-semibold">
				{task.completed ? "☑" : "□"} {task.title}
			</h2>

			<p className="text-sm text-gray-500">
				期限:{task.dueDate}
			</p>

			<button
				onClick={() =>
					onEdit(task)
				}
				className="mr-2 rounded bg-gray-500 px-3 py-2 text-white"
			>
				編集
			</button>

			<button
				onClick={()=>onDelete(task.id)}
				className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
			>
				削除
			</button>
		</div>
	);
}