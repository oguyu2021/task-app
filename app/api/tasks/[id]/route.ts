import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { taskUpdateSchema } from "@/schemas/taskUpdate";
import { z } from "zod";
import { auth } from "@/auth";

//削除機能
export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {

  const session = await auth();

  if(!session?.user?.id) {
    return NextResponse.json(
      {message: "認証されていません"},
      {status: 401}
    );
  }

  const { id } = await params;

  const existingTask = await prisma.task.findFirst({
    where: {
      id: Number(id),
      userId: Number(session.user.id),
    },
  });

  if (!existingTask) {
    return NextResponse.json(
      { message: "このタスクを削除する権限がありません" },
      { status: 403 }
    );
  }

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
  const session = await auth();

  if(!session?.user?.id) {
    return NextResponse.json(
      {message: "認証されていません"},
      {status: 401}
    );
  }

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

  const existingTask = await prisma.task.findFirst({
    where: {
      id: Number(id),
      userId: Number(session.user.id),
    },
  });

  if (!existingTask) {
    return NextResponse.json(
      { message: "このタスクを更新する権限がありません" },
      { status: 403 }
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