// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function getToken(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  console.log(allCookies);

  // request.cookies.has("nextjs"); // => true
  // request.cookies.delete("nextjs");
  // request.cookies.has("nextjs"); // => false

  return allCookies;
}
