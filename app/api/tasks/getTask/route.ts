import { NextResponse } from "next/server";
import Task from "@/models/task";
import connectToDatabase from "@/lib/mongoose";

// Handler for GET requests
export async function GET(request: Request) {
  try {
    await connectToDatabase();

    // Fetch all tasks from the database
    const tasks = await Task.find().lean();

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve tasks" },
      { status: 500 },
    );
  }
}
