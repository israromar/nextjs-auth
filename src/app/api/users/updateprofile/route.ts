import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { oldEmail, username, newEmail, updateUsername, updateEmail } =
      reqBody;

    // Find the user by email
    const user = await User.findOne({ email: oldEmail });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 400 }
      );
    }

    if (updateEmail) {
      // Check if the new email already exists
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: "Email already exists" },
          { status: 400 }
        );
      }
      user.email = newEmail;
    }

    if (updateUsername) {
      user.username = username;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
