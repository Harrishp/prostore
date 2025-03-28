// export { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const sessionCartId = request.cookies.get("sessionCartId");

  if (!sessionCartId) {
    const response = NextResponse.next();
    response.cookies.set("sessionCartId", crypto.randomUUID());
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
