"use client";

import { signOut } from "next-auth/react";

export default function Header() {
	return (
		<header className="flex items-center justify-between border-b p-6">
			<h1 className="text-3xl font-bold">
				Task App
			</h1>
			<button 
				onClick={()=> signOut({
					callbackUrl: "/login",
				})}
				className="rounded bg-red-600 px-4 py-2 text-white">
				ログアウト
			</button>
		</header>
	)
}