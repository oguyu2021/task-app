type Props = {
  title: string;
  dueDate: string;
  editingId: number | null;

  onTitleChange: (value: string) => void;
  onDueDateChange: (value: string) => void;

  onAdd: () => void;
  onSave: () => void;
};

export default function TaskForm({
  title,
  dueDate,
  editingId,
  onTitleChange,
  onDueDateChange,
  onAdd,
  onSave,
}: Props) {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">
        {editingId ? "タスク編集" : "新しいタスク"}
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          value={title}
          placeholder="タスク名"
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full rounded border p-2"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
          className="w-full rounded border p-2"
        />

        {editingId ? (
          <button
            onClick={onSave}
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            保存
          </button>
        ) : (
          <button
            onClick={onAdd}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            タスク追加
          </button>
        )}
      </div>
    </div>
  );
}