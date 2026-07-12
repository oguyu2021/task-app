"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Task } from "@/types/task";
import Dashboard from "@/components/Dashboard";
import { toast } from "sonner";
import { taskSchema } from "@/schemas/task";

export default function Home() {
  // タスク一覧（初期データ）
  const [tasks, setTasks] = useState<Task[]>([]);
  
  //ローディング
  const [loading, setLoading] = useState(true);

  //エラーハンドリング
  const [error, setError] = useState("");

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

        if(!res.ok) {
          throw new Error("取得失敗");
        }

        const data = await res.json();

        setTasks(data);
      }catch (error) {
        console.error(error);
        setError("タスクの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // タスク追加
  const addTask = async () => {

    const result = taskSchema.safeParse({
      title,
      dueDate,
    })

    if(!result.success){
      toast.error(result.error.issues[0].message)
      return;
    }

  try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          dueDate,
        }),
      });

      if (!res.ok) {
        throw new Error("タスク追加に失敗しました。");
      }

      const newTask = await res.json();

      setTasks((prev) => [...prev, newTask]);

      setTitle("");
      setDueDate("");

      toast.success("タスクを追加しました。");
    } catch (error) {
      console.error(error);
      toast.error("タスクの追加に失敗しました。");
    }
  };

  // タスク削除
  const deleteTask = async (id: number) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("削除に失敗しました");
      }

      setTasks((prev) =>
        prev.filter((task) => task.id !== id)
      );

      toast.success("タスクを削除しました。");
    } catch (error) {
      console.error(error);
      toast.error("タスクの削除に失敗しました。");
    }
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

    try {
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

      if (!res.ok) {
        const error = await res.json();

        const message =
          error.errors?.fieldErrors?.title?.[0] ||
          "更新に失敗しました";

        toast.error(message);

        return;
      }

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

      toast.success("タスクを更新しました。");
    } catch (error) {
      console.error(error);
      toast.error("タスクの更新に失敗しました。");
    }
  };

  //タスク編集(完了状態のチェック部分）
  const toggleTask = async (id: number) => {
    const targetTask = tasks.find(
      (task) => task.id === id
    );

    if (!targetTask) {
      return;
    }

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !targetTask.completed,
        }),
      });

      if (!res.ok) {
        throw new Error("更新に失敗しました");
      }

      const updatedTask = await res.json();

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? updatedTask
            : task
        )
      );

      toast.success("状態を更新しました。");
    } catch (error) {
      console.error(error);
      toast.error("状態の更新に失敗しました。");
    }
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

        ) : error ?(

          <p className="py-12 text-center text-lg text-red-500">
            {error}
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