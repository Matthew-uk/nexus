import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { ObjectId } from "mongodb";

interface User {
  _id: ObjectId;
  balance: number;
  isSubscribed: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, amount } = await req.json();

    if (!userId || typeof amount !== "number") {
      return NextResponse.json(
        { message: "Invalid request parameters" },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();

    const result = await db
      .collection<User>("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $inc: { balance: amount }, $set: { isSubscribed: true } },
      );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Balance and subscription status updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating balance:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
