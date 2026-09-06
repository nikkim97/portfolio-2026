import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE = "capital-one-case-study-access";
const ACCESS_VALUE = "granted";

export function proxy(request: NextRequest) {
  const hasAccess = request.cookies.get(ACCESS_COOKIE)?.value === ACCESS_VALUE;

  if (hasAccess) {
    return NextResponse.next();
  }

  const accessUrl = new URL("/case-study/access", request.url);
  accessUrl.searchParams.set("redirect", request.nextUrl.pathname);

  return NextResponse.redirect(accessUrl);
}

export const config = {
  matcher: [
    "/case-study/discover-integration",
    "/case-study/path-360",
    "/case-study/people-leader-redesign",
    "/case-study/sa-xd",
  ],
};
