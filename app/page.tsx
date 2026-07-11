"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

import { Task } from "@/types/task";

import Dashboard from "@/components/Dashboard";

export default function Home() {
  // タスク一覧（初期データ）
  const [tasks, setTasks] = useState<Task[]>([]);
  
  //ローディング
  const [loading, setLoading] = useState(true);

  // フォーム入力
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  // 編集中のタスクID
  const [editingId, setEditingId] = useState<number | null>(null);

  //初回でDBに保存されているタスクを表示
  useEffect(() => {
    const fetchTasks = async () => {
      try{
        const res = await fetch("/api/tasks");
        const data = await res.json();

        setTasks(data);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // タスク追加
  const addTask = async () => {
    if (!title.trim()) {
      alert("タスク名を入力してください。");
      return;
    }

    const res = await fetch("/api/tasks",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dueDate,
      }),
    });

    const newTask = await res.json();

    setTasks([...tasks, newTask]);

    setTitle("");
    setDueDate("");
  };

  // タスク削除
  const deleteTask = async (id: number) => {
    await fetch(`/api/tasks/${id}`,{
      method: "DELETE",
    });

    setTasks((prev)=>
     prev.filter((task) => task.id !== id)
    );
  };

  // タスク編集開始
  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDueDate(task.dueDate);
  };

  // タスク編集保存（タイトル、期日）
  const saveEdit = async () => {
    if (editingId === null) {
      return;
    }

    const res = await fetch(`/api/tasks/${editingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dueDate,
      }),
    });

    const updatedTask = await res.json();

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingId
          ? updatedTask
          : task
      )
    );

    setEditingId(null);
    setTitle("");
    setDueDate("");
  };

  //タスク編集(チェック）
  const toggleTask = async (id: number) => {
    const targetTask = tasks.find(
      (task) => task.id === id
    );

    if (!targetTask) {
      return;
    }

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !targetTask.completed,
      }),
    });

    const updatedTask = await res.json();

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? updatedTask
          : task
      )
    );
  };

  //ダッシュボード表示
  //全件数
  const totalCount = tasks.length;

  //完了数
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  //完了済数
  const activeCount = tasks.filter(
    (task) => !task.completed
  ).length;

  //フィルター機能(state)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  //検索機能(state)
  const [searchText, setSearchText] = useState("");

  //フィルター機能(表示)
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "active"
        ? !task.completed
        : task.completed;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

      return matchesFilter && matchesSearch;
  });

  //ソート機能
  const [sortType, setSortType] = useState<
    "created" | "dueAsc" | "dueDesc" | "title"
  >("created");

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortType) {
      case "dueAsc":
        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        );

      case "dueDesc":
        return (
          new Date(b.dueDate).getTime() -
          new Date(a.dueDate).getTime()
        );

      case "title":
        return a.title.localeCompare(b.title);

      default:
        return b.id - a.id;
    }
  });

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="mx-auto max-w-3xl p-6">
        {loading ? (
          <p className="py-12 text-center text-lg text-gray-500 animate-pulse">
            読み込み中・・・
          </p>
        ) : (
        <>
          <Dashboard
            total={totalCount}
            active={activeCount}
            completed={completedCount}
          />

          <div className="mb-4">
            <input
              type="text"
              placeholder="タスクを検索..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded border p-2"
            />
          </div>

          <div className="mb-4">
            <select
              value={sortType}
              onChange={(e)=>
                setSortType(
                  e.target.value as
                  | "created"
                  | "dueAsc"
                  | "dueDesc"
                  | "title"
                )
              }
              className="rounded border p-2"
            >
              <option value="created">作成順</option>
              <option value="dueAsc">期限が近い順</option>
              <option value="dueDesc">期限が遠い順</option>
              <option value="title">タイトル順</option>
            </select>
          </div>
        
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
            tasks={sortedTasks}
            onDelete={deleteTask}
            onEdit={startEdit}
            onToggle={toggleTask}
          />
        </>
        )}
      </section>
    </main>
  );
}