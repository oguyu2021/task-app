type TaskCardProps = {
	id: number;
	title: string;
	dueDate: string;
	completed: boolean;
	onDelete: (id: number) => void;
};

export default function TaskCard({
	id,
	title,
	dueDate,
	completed,
	onDelete,
}: TaskCardProps) {
	return (
		<div className="rounded-lg border p-4 shadow-sm">
			<h2 className="text-lg font-semibold">
				{completed ? "☑" : "□"} {title}
			</h2>

			<p className="text-sm text-gray-500">
				期限:{dueDate}
			</p>

			<button
				onClick={()=>onDelete(id)}
				className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
			>
				削除
			</button>
		</div>
	);
}