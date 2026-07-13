"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  taskSchema,
  type TaskInput,
} from "@/schemas/task";


type Props = {
  onAdd: (data: TaskInput) => Promise<void>;
};


export default function TaskForm({
  onAdd,
}: Props) {

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<TaskInput>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      dueDate: "",
    },
  });


  const submitHandler = async (
    data: TaskInput
  ) => {

    await onAdd(data);

    // 成功後フォーム初期化
    reset();
  };


  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow">

      <h2 className="mb-4 text-xl font-bold">
        新しいタスク
      </h2>


      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-4"
      >

        {/* タイトル */}
        <div>

          <input
            {...register("title")}
            placeholder="タスク名"
            className="w-full rounded border p-2"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}

        </div>


        {/* 期限 */}
        <div>

          <input
            type="date"
            {...register("dueDate")}
            className="w-full rounded border p-2"
          />


          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dueDate.message}
            </p>
          )}

        </div>


        <button
          type="submit"
          disabled={isSubmitting}
          className="
            rounded 
            bg-blue-600 
            px-4 
            py-2 
            text-white
            disabled:opacity-50
          "
        >
          {isSubmitting
            ? "追加中..."
            : "タスク追加"
          }

        </button>


      </form>

    </div>
  );
}