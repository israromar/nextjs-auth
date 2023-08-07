import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bycryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User does not exists" },
        { status: 400 }
      );
    }

    // check password
    const validPassword = await bycryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { success: false, error: "Incorrect password" },
        { status: 400 }
      );
    }

    // check if email is verified
    if (!user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "To access your account, please verify your email address",
        },
        { status: 400 }
      );
    }

    // create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // create token
    const token = await Jwt.sign(tokenData, process.env.TOKEN_SECRECT!, {
      expiresIn: 24 * 60 * 60,
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      //   user,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
