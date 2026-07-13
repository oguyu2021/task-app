"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  taskSchema,
  type TaskInput,
} from "@/schemas/task";

import { Task } from "@/types/task";


type Props = {
  task: Task | null;

  onClose: () => void;

  onUpdate: (
    id: number,
    data: TaskInput
  ) => Promise<void>;
};


export default function EditTaskModal({
  task,
  onClose,
  onUpdate,
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
  });



  useEffect(() => {

    if (task) {

      reset({
        title: task.title,
        dueDate:
          task.dueDate.substring(0, 10),
      });

    }

  }, [task, reset]);



  if (!task) {
    return null;
  }



  const submitHandler = async (
    data: TaskInput
  ) => {

    await onUpdate(
      task.id,
      data
    );

    onClose();

  };



  return (

    <div
      className="
        fixed
        inset-0
        flex
        items-center
        justify-center
        bg-black/50
      "
    >

      <div
        className="
          w-full
          max-w-md
          rounded-lg
          bg-white
          p-6
        "
      >

        <h2 className="mb-4 text-xl font-bold">
          タスク編集
        </h2>


        <form
          onSubmit={
            handleSubmit(submitHandler)
          }
          className="space-y-4"
        >


          <div>

            <input
              {...register("title")}
              className="
                w-full
                rounded
                border
                p-2
              "
            />


            {errors.title && (

              <p className="text-sm text-red-500">
                {errors.title.message}
              </p>

            )}

          </div>



          <div>

            <input
              type="date"
              {...register("dueDate")}
              className="
                w-full
                rounded
                border
                p-2
              "
            />


            {errors.dueDate && (

              <p className="text-sm text-red-500">
                {errors.dueDate.message}
              </p>

            )}

          </div>



          <div className="flex gap-2">


            <button
              type="submit"
              disabled={isSubmitting}
              className="
                rounded
                bg-green-600
                px-4
                py-2
                text-white
              "
            >
              保存
            </button>



            <button
              type="button"
              onClick={onClose}
              className="
                rounded
                bg-gray-300
                px-4
                py-2
              "
            >
              キャンセル
            </button>


          </div>


        </form>


      </div>

    </div>

  );
}