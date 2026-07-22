"use client";

import { signOut, useSession } from "next-auth/react";

export default function Header() {

	const { data: session } = useSession();

	return (
		<header className="flex items-center justify-between border-b p-6">
			<h1 className="text-3xl font-bold">
				Task Management App
			</h1>

			<div className="flex items-center gap-4">
				<p className="text-sm text-gray-600">
					 {session?.user?.name ?? "ゲスト"}
				</p>

				<button
					onClick={()=> signOut({
						callbackUrl: "/login",
					})}
					className="rounded bg-red-600 px-4 py-2 text-white">
					ログアウト
				</button>
			</div>
		</header>
	)
}