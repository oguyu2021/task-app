"use client";

import { useState } from "react";

import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

import { Task } from "@/types/task";

export default function Home() {
  // タスク一覧
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Next.jsを学習する",
      dueDate: "2026-07-10",
      completed: false,
    },
    {
      id: 2,
      title: "ポートフォリオ作成",
      dueDate: "2026-07-15",
      completed: false,
    },
  ]);

  // フォーム入力
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // 編集中のタスクID
  const [editingId, setEditingId] = useState<number | null>(null);

  // タスク追加
  const addTask = () => {
    if (!title.trim()) {
      alert("タスク名を入力してください。");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      dueDate,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setDueDate("");
  };

  // タスク削除
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // 編集開始
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDueDate(task.dueDate);
  };

  // 編集保存
  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingId
          ? {
              ...task,
              title,
              dueDate,
            }
          : task
      )
    );

    setEditingId(null);
    setTitle("");
    setDueDate("");
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-3xl p-6">
        <TaskForm
          title={title}
          dueDate={dueDate}
          editingId={editingId}
          onTitleChange={setTitle}
          onDueDateChange={setDueDate}
          onAdd={addTask}
          onSave={saveEdit}
        />

        <TaskList
          tasks={tasks}
          onDelete={deleteTask}
          onEdit={startEdit}
        />
      </section>
    </main>
  );
}