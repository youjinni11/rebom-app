export type Gender = "male" | "female";

export type AgeRange = "50-54" | "55-59" | "60-64" | "65-69";

export interface PreRegistration {
  id: string;
  name: string;
  gender: Gender;
  age_range: AgeRange;
  phone: string;
  consent_required: boolean;
  consent_marketing: boolean;
  created_at: string;
}

export type VerificationStatus = "pending" | "approved" | "rejected";

export type MatchStatus = "active" | "inactive";

export type AppointmentStatus = "proposed" | "confirmed" | "cancelled";

export interface ValuesData {
  meeting_priorities: string[];
  relationship_goals: string[];
  politics: string[];
  religion: string[];
  avoid_filters: string[];
}

export interface LifestyleData {
  activities: string[];
  family: string[];
  self_care: string[];
  drinking: string[];
  smoking: string[];
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string;
  birth_year: number;
  gender: Gender;
  region: string;
  bio: string | null;
  photo_urls: string[];
  phone: string | null;
  is_complete: boolean;
  phone_verified_at: string | null;
  face_verified_at: string | null;
  marital_deferred: boolean;
  values_data: ValuesData;
  lifestyle_data: LifestyleData;
  values_complete: boolean;
  lifestyle_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface Verification {
  id: string;
  user_id: string;
  type: "marital";
  status: VerificationStatus;
  codef_raw: Record<string, unknown> | null;
  verified_at: string | null;
  created_at: string;
}

export interface DailyRecommendation {
  id: string;
  user_id: string;
  candidate_id: string;
  recommend_date: string;
  shown_at: string;
}

export interface Interest {
  id: string;
  from_user_id: string;
  to_user_id: string;
  created_at: string;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  status: MatchStatus;
  created_at: string;
}

export interface Appointment {
  id: string;
  match_id: string;
  proposer_id: string;
  scheduled_at: string;
  place_name: string;
  place_address: string | null;
  note: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface ProfileWithUser extends Profile {
  email?: string;
}

export interface MatchWithProfile extends Match {
  partner: Profile;
}

export interface AppointmentWithDetails extends Appointment {
  partner: Profile;
  match: Match;
}
