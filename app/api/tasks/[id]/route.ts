import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { taskUpdateSchema } from "@/schemas/taskUpdate";
import { z } from "zod";

//削除機能
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const task = await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(task);
}

//編集機能
export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const body = await request.json();

  const result = taskUpdateSchema.safeParse(body);

  if(!result.success){
    return NextResponse.json(
      {
        errors: z.flattenError(result.error),
      },
      {
        status: 400,
      }
    );
  }

  const task = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      ...(result.data.title !== undefined && {
        title: result.data.title,
      }),

      ...(result.data.dueDate !== undefined && {
        dueDate: new Date(result.data.dueDate),
      }),

      ...(result.data.completed !== undefined && {
        completed: result.data.completed,
      }),
    },
  });

  return NextResponse.json(task);
}