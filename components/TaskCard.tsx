import { Task } from "@/types/task";

type TaskCardProps = {
	task: Task;
	onDelete: (id: number) => void;
	onEdit: (task: Task) => void;
	onToggle: (id: number) => void;
};

export default function TaskCard({
	task,
	onEdit,
	onDelete,
	onToggle,
}: TaskCardProps) {
	return (
		<div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
				<div className="flex items-center gap-3"></div>
				
				<input
				type="checkbox"
				checked={task.completed}
				onChange={() => onToggle(task.id)}
				/>

			<div>
				<h2
					className={`text-lg font-semibold ${
						task.completed ? "line-through text-gray-400" : ""
					}`}
				>
					{task.title}
				</h2>

				<p className="text-sm text-gray-500">
					期限:{task.dueDate}
				</p>
			</div>

			<div className="flex gap-2">
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
		</div>
	);
}