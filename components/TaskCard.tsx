type TaskCardProps = {
	title: string;
	dueDate: string;
	completed: boolean;
};

export default function TaskCard({
	title,
	dueDate,
	completed,
}: TaskCardProps) {
	return (
		<div className="rounded-lg border p-4 shadow-sm">
			<h2 className="text-lg font-semibold">
				{completed ? "☑" : "□"} {title}
			</h2>

			<p className="text-sm text-gray-500">
				期限:{dueDate}
			</p>
		</div>
	);
}