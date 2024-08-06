import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";

// Define the POST handler for the file upload
export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming form data
    const formData = await req.formData();

    // Get the file from the form data
    const file = formData.get("file") as File | null;

    // Check if a file is received
    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 },
      );
    }

    // Convert the file data to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Replace spaces in the file name with underscores
    const filename = file.name.replaceAll(" ", "_");
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write the file to the specified directory
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Construct the file URL
    const fileUrl = `/uploads/${filename}`;

    // Return a JSON response with the file location and a success message
    return NextResponse.json({ Message: "Success", status: 201, fileUrl });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
