// pages/api/admin.ts

import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Admin from "@/models/admin";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all admins
    const admins = await Admin.find({});
    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await req.json();
    const { username, email, password, role } = body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newAdmin.save();

    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 },
    );
  }
}
