import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/pre-register",
  "/privacy",
  "/welcome",
  "/onboarding",
];
const authRoutes = ["/login", "/signup"];
const setupRoutes = [
  "/signup/verify",
  "/profile",
  "/values",
  "/lifestyle",
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/demo") || pathname.startsWith("/wireframe")) {
    return NextResponse.next();
  }

  const { supabase, user, supabaseResponse } = await updateSession(request);

  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/signup")
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isApiRoute = pathname.startsWith("/api");

  if (isApiRoute) {
    return supabaseResponse;
  }

  if (!user) {
    if (!isPublic && !pathname.startsWith("/signup")) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  if (isAuthRoute && pathname !== "/signup/verify") {
    const url = request.nextUrl.clone();
    url.pathname = "/matches";
    return NextResponse.redirect(url);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "is_complete, values_complete, lifestyle_complete, phone_verified_at, face_verified_at, marital_deferred"
    )
    .eq("user_id", user.id)
    .maybeSingle();

  const phoneFaceDone =
    !!profile?.phone_verified_at && !!profile?.face_verified_at;

  const { data: verification } = await supabase
    .from("verifications")
    .select("status")
    .eq("user_id", user.id)
    .eq("type", "marital")
    .maybeSingle();

  const isMaritalVerified = verification?.status === "approved";
  const maritalOk = isMaritalVerified || !!profile?.marital_deferred;

  if (!phoneFaceDone || !maritalOk) {
    if (!pathname.startsWith("/signup/verify") && pathname !== "/signup") {
      const url = request.nextUrl.clone();
      url.pathname = "/signup/verify";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  const isProfileComplete = profile?.is_complete ?? false;
  const isValuesComplete = profile?.values_complete ?? false;
  const isLifestyleComplete = profile?.lifestyle_complete ?? false;
  const allSetupComplete =
    isProfileComplete && isValuesComplete && isLifestyleComplete;

  if (!isProfileComplete) {
    if (!pathname.startsWith("/profile")) {
      const url = request.nextUrl.clone();
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  if (!isValuesComplete) {
    if (!pathname.startsWith("/values")) {
      const url = request.nextUrl.clone();
      url.pathname = "/values";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  if (!isLifestyleComplete) {
    if (!pathname.startsWith("/lifestyle")) {
      const url = request.nextUrl.clone();
      url.pathname = "/lifestyle";
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  if (allSetupComplete && setupRoutes.some((r) => pathname.startsWith(r))) {
    const url = request.nextUrl.clone();
    url.pathname = "/matches";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
