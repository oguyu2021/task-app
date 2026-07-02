"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

import { Task } from "@/types/task";

export default function Home() {
  // タスク一覧（初期データ）
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

  //初回でローカルストレージに保管されたタスクを表示（文字列→配列）
  useEffect(() => {
      const savedTasks = localStorage.getItem("tasks");

      if(savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    }, []);

  //tasksが変わるたびにローカルストレージに保存（配列→文字列）
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  //チェック機能
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => 
       task.id === id
          ?{
            ...task,
            completed: !task.completed,
           }
          : task
      )
    );
  };

  //フィルター機能(state)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  //フィルター機能(表示)
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-3xl p-6">
      
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded px-3 py-1 ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            全部
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`rounded px-3 py-1 ${
              filter === "active"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            未完了
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`rounded px-3 py-1 ${
              filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            完了済み
          </button>
        </div>

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
          tasks={filteredTasks}
          onDelete={deleteTask}
          onEdit={startEdit}
          onToggle={toggleTask}
        />
      </section>
    </main>
  );
}