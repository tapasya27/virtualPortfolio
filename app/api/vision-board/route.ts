import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const visionBoardDir = path.join(
      process.cwd(),
      "public",
      "vision-board"
    );

    // Check if directory exists
    if (!fs.existsSync(visionBoardDir)) {
      return NextResponse.json({ images: [] });
    }

    // Read all files in the directory
    const files = fs.readdirSync(visionBoardDir);

    // Filter for image files only
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
    });

    // Sort files to ensure consistent order
    imageFiles.sort();

    return NextResponse.json({ images: imageFiles });
  } catch (error) {
    console.error("Error reading vision board directory:", error);
    return NextResponse.json({ images: [] });
  }
}
