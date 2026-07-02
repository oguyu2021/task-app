import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  onToggle: (id: number) => void;
};

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  onToggle,
}: Props) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}