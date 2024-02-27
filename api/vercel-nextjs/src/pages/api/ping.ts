// Endpoint for API status check
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async (req: NextRequest) => {
  return NextResponse.json({ message: "up" });
};
