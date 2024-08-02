import { NextResponse } from "next/server";
import Task from "@/models/task";
import connectToDatabase from "@/lib/mongoose";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const { taskName, taskPlatform, taskLink, taskDescription } =
      await request.json();

    const newTask = new Task({
      taskName,
      taskPlatform,
      taskLink,
      taskDescription,
    });

    await newTask.save();

    return NextResponse.json(
      { message: "Task created successfully!" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
