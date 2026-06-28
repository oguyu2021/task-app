"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TaskCard from "@/components/TaskCard";

export default function Home() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Next.jsを学習する",
      dueDate: "2026/07/10",
      completed: false,
    },
  ]);

  const addTask = () =>{
    const newTask = {
      id: Date.now(),
      title: "新しいタスク",
      dueDate: "2026/07/30",
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6">
        <button
          onClick={addTask}
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          タスク追加
        </button>
        
        <section className="mx-auto max-w-3xl space-y-4 p-6">
          {tasks.map((task)=>(
            <TaskCard
              key={task.id}
              title={task.title}
              dueDate={task.dueDate}
              completed={task.completed}
            />
          ))}
        </section>
      </div>
    </main>
  );
}