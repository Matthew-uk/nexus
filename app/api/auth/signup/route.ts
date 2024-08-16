import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import connectToDatabase from "@/lib/mongoose";
import User from "@/models/user";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await req.json();
    const { firstName, lastName, email, password, confirmPassword, referrer } =
      body;

    // Ensure all fields are present
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      referrer,
    });

    // Save the user to the database
    await user.save();

    // Update referrer's balance if referrer is provided
    if (referrer) {
      const referrerUser = await User.findOne({ referralCode: referrer });
      console.log(referrer);
      console.log("This is the referrer");
      console.log(referrerUser);
      if (referrerUser) {
        referrerUser.pendingBalance += 200; // Adjust according to your schema
        await referrerUser.save();
      }
    }

    // Return success response
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
