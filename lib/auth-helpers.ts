import { createClient, createServiceClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getVerificationStatus(userId: string) {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("verifications")
    .select("status")
    .eq("user_id", userId)
    .eq("type", "marital")
    .maybeSingle();

  return data?.status ?? null;
}

export async function getProfileStatus(userId: string) {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("profiles")
    .select("is_complete")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.is_complete ?? false;
}
