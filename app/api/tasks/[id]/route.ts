import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

  const task = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      ...(body.title !== undefined && {
        title: body.title,
      }),

      ...(body.dueDate !== undefined && {
        dueDate: new Date(body.dueDate),
      }),

      ...(body.completed !== undefined && {
        completed: body.completed,
      }),
    },
  });

  return NextResponse.json(task);
}