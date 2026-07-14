import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { taskSchema } from "@/schemas/task";
import { z } from "zod";
import { auth } from "@/auth";


export async function GET() {

  const session = await auth();


  if (!session?.user?.id) {

    return NextResponse.json(
      {
        message: "認証されていません",
      },
      {
        status: 401,
      }
    );

  }


  const tasks = await prisma.task.findMany({

    where: {
      userId: Number(session.user.id),
    },

    orderBy: {
      createdAt: "desc",
    },

  });


  return NextResponse.json(tasks);

}



export async function POST(request: Request) {

  const session = await auth();


  if (!session?.user?.id) {

    return NextResponse.json(
      {
        message: "認証されていません",
      },
      {
        status: 401,
      }
    );

  }


  const body = await request.json();


  const result = taskSchema.safeParse(body);


  if (!result.success) {

    return NextResponse.json(
      {
        errors: z.flattenError(result.error),
      },
      {
        status: 400,
      }
    );

  }


  const task = await prisma.task.create({

    data: {

      title: result.data.title,

      dueDate:
        new Date(result.data.dueDate),

      completed: false,

      userId:
        Number(session.user.id),

    },

  });


  return NextResponse.json(
    task,
    {
      status: 201,
    }
  );

}