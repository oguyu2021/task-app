"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";

type Task = {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function Home() {
  // タスク一覧
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Next.jsを学習する",
      dueDate: "2026/07/10",
      completed: false,
    },
    {
      id: 2,
      title: "ポートフォリオ作成",
      dueDate: "2026-07-15",
      completed: false,
    },
  ]);

  //入力フォーム
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  //タスク追加
  const addTask = () =>{
    if(!title.trim()){
      alert("タスク名を入力してください。");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      dueDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    //入力欄リセット
    setTitle("");
    setDueDate("");
  };

  //タスク削除
  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-3xl space-y-4 p-6">
        {/* 入力フォーム */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">新しいタスク</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="タスク名"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border p-2"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded border p-2"
            />

            <button
              onClick={addTask}
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            >
              タスク追加
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              dueDate={task.dueDate}
              completed={task.completed}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </section>

    </main>
  );
}