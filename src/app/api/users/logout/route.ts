import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
     // this is used to clear a cookie named "token" effectively it is used for logout functionality in auth
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
