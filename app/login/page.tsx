"use client";

import { signIn } from "@/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    const result =
      await signIn(
        "credentials",
        {
          email,
          password,
          redirect: false,
        }
      );


    if (result?.error) {

      alert(
        "ログインに失敗しました"
      );

      return;

    }


    router.push("/");

  };


  return (

    <main className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-gray-100
    ">

      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-sm
          space-y-4
          rounded
          bg-white
          p-6
          shadow
        "
      >

        <h1 className="text-xl font-bold">
          ログイン
        </h1>


        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-2
          "
        />


        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          className="
            w-full
            rounded
            border
            p-2
          "
        />


        <button
          className="
            w-full
            rounded
            bg-blue-600
            py-2
            text-white
          "
        >
          ログイン
        </button>

        <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">
          アカウントをお持ちでない方は
        </span>{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:underline"
        >
          こちら
        </Link>
      </div>


      </form>

    </main>

  );

}