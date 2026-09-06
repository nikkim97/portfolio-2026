import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE = "capital-one-case-study-access";
const ACCESS_VALUE = "granted";
const PASSWORD = "capitalone2026";
const PROTECTED_PATHS = new Set([
  "/case-study/discover-integration",
  "/case-study/path-360",
  "/case-study/people-leader-redesign",
  "/case-study/sa-xd",
]);

function getSafeRedirect(value: FormDataEntryValue | null) {
  if (typeof value !== "string" || !PROTECTED_PATHS.has(value)) {
    return "/case-study/path-360";
  }

  return value;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password");
  const redirectPath = getSafeRedirect(formData.get("redirect"));

  if (password !== PASSWORD) {
    const retryUrl = new URL("/case-study/access", request.url);
    retryUrl.searchParams.set("redirect", redirectPath);
    retryUrl.searchParams.set("error", "1");

    return NextResponse.redirect(retryUrl, 303);
  }

  const response = NextResponse.redirect(new URL(redirectPath, request.url), 303);
  response.cookies.set(ACCESS_COOKIE, ACCESS_VALUE, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });

  return response;
}
