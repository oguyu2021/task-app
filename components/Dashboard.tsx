type Props = {
  total: number;
  active: number;
  completed: number;
};

export default function Dashboard({
  total,
  active,
  completed,
}: Props) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">
          全タスク
        </p>

        <p className="text-3xl font-bold">
          {total}
        </p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">
          未完了
        </p>

        <p className="text-3xl font-bold text-orange-500">
          {active}
        </p>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">
          完了済み
        </p>

        <p className="text-3xl font-bold text-green-600">
          {completed}
        </p>
      </div>
    </div>
  );
}