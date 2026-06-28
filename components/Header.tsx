export default function Header() {
	return (
		<header className="flex items-center justify-between border-b p-6">
			<h1 className="text-3xl font-bold">
				Task Manager
			</h1>
			<button className="rounded bg-blue-600 px-4 py-2 text-white">
				+ 新規タスク
			</button>
		</header>
	)
}