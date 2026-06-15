import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  res.setHeader(
    "Set-Cookie",
    serialize("veloura_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    })
  );

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}