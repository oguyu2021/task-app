import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { taskSchema } from "@/schemas/task";
import { z } from "zod";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();

  const result = taskSchema.safeParse(body);

  if(!result.success){
    return NextResponse.json(
      {
        errors: z.flattenError(result.error),
      },
      {
        status: 400,
      }
    )
  }

  const task = await prisma.task.create({
    data: {
      title: result.data.title,
      dueDate: new Date(result.data.dueDate),
      completed: false,
    },
  });

  return NextResponse.json(task, { status: 201})
}