import { error } from "console";
import User from "../../../modals/Users";
import { NextRequest, NextResponse } from "next/server";
import { ConnectToDatabase } from "../../../lib/db";

export async function POST(request: NextRequest) {
  try {
    // getting data from frontend
    const { email, password } = await request.json();

    //validating the register request
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    // checking db connection

    await ConnectToDatabase();
    // check for existing user'

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { errro: "User alraedy exists" },
        { status: 400 }
      );
    }

    // storing new user
    await User.create({
      email,
      password,
    });

    return NextResponse.json(
      { message: "User craeted sucessfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registartion Error" + error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}
