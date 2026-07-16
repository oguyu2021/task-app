export default function TaskSkeleton() {
  return (
    <div className="space-y-4">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-lg bg-white p-4 shadow"
        >

          <div className="mb-3 h-5 w-2/3 rounded bg-gray-200" />

          <div className="h-4 w-1/3 rounded bg-gray-200" />

        </div>
      ))}

    </div>
  );
}