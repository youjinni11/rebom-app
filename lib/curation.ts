import {
  AVOID_FILTER_CHIPS,
  DRINKING_CHIPS,
  FAMILY_CHIPS,
  LIFESTYLE_CHIPS,
  POLITICS_CHIPS,
  RELIGION_CHIPS,
  SELF_CARE_CHIPS,
  SMOKING_CHIPS,
  VALUES_Q1_CHIPS,
  VALUES_Q2_CHIPS,
} from "@/components/demo/curation-chips";

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

export const EMPTY_VALUES_DATA: ValuesData = {
  meeting_priorities: [],
  relationship_goals: [],
  politics: [],
  religion: [],
  avoid_filters: [],
};

export const EMPTY_LIFESTYLE_DATA: LifestyleData = {
  activities: [],
  family: [],
  self_care: [],
  drinking: [],
  smoking: [],
};

export function indicesToLabels(
  chips: readonly string[],
  indices: number[]
): string[] {
  return indices.map((i) => chips[i]).filter(Boolean);
}

export function labelsToIndices(
  chips: readonly string[],
  labels: string[]
): number[] {
  return labels
    .map((label) => chips.indexOf(label))
    .filter((i) => i >= 0);
}

export function valuesDataToSelections(data: ValuesData) {
  return {
    q1: labelsToIndices(VALUES_Q1_CHIPS, data.meeting_priorities),
    q2: labelsToIndices(VALUES_Q2_CHIPS, data.relationship_goals),
    politics: labelsToIndices(POLITICS_CHIPS, data.politics),
    religion: labelsToIndices(RELIGION_CHIPS, data.religion),
    avoid: labelsToIndices(AVOID_FILTER_CHIPS, data.avoid_filters),
  };
}

export function lifestyleDataToSelections(data: LifestyleData) {
  return {
    lifestyle: labelsToIndices(LIFESTYLE_CHIPS, data.activities),
    family: labelsToIndices(FAMILY_CHIPS, data.family),
    selfCare: labelsToIndices(SELF_CARE_CHIPS, data.self_care),
    drinking: labelsToIndices(DRINKING_CHIPS, data.drinking),
    smoking: labelsToIndices(SMOKING_CHIPS, data.smoking),
  };
}

export function selectionsToValuesData(selections: {
  q1: number[];
  q2: number[];
  politics: number[];
  religion: number[];
  avoid: number[];
}): ValuesData {
  return {
    meeting_priorities: indicesToLabels(VALUES_Q1_CHIPS, selections.q1),
    relationship_goals: indicesToLabels(VALUES_Q2_CHIPS, selections.q2),
    politics: indicesToLabels(POLITICS_CHIPS, selections.politics),
    religion: indicesToLabels(RELIGION_CHIPS, selections.religion),
    avoid_filters: indicesToLabels(AVOID_FILTER_CHIPS, selections.avoid),
  };
}

export function selectionsToLifestyleData(selections: {
  lifestyle: number[];
  family: number[];
  selfCare: number[];
  drinking: number[];
  smoking: number[];
}): LifestyleData {
  return {
    activities: indicesToLabels(LIFESTYLE_CHIPS, selections.lifestyle),
    family: indicesToLabels(FAMILY_CHIPS, selections.family),
    self_care: indicesToLabels(SELF_CARE_CHIPS, selections.selfCare),
    drinking: indicesToLabels(DRINKING_CHIPS, selections.drinking),
    smoking: indicesToLabels(SMOKING_CHIPS, selections.smoking),
  };
}

export function lifestyleTagsFromData(data: LifestyleData): string[] {
  return [
    ...data.activities,
    ...data.family,
    ...data.self_care,
    ...data.drinking,
    ...data.smoking,
  ];
}

export function parseValuesData(raw: unknown): ValuesData {
  if (!raw || typeof raw !== "object") return { ...EMPTY_VALUES_DATA };
  const obj = raw as Record<string, unknown>;
  return {
    meeting_priorities: Array.isArray(obj.meeting_priorities)
      ? (obj.meeting_priorities as string[])
      : [],
    relationship_goals: Array.isArray(obj.relationship_goals)
      ? (obj.relationship_goals as string[])
      : [],
    politics: Array.isArray(obj.politics) ? (obj.politics as string[]) : [],
    religion: Array.isArray(obj.religion) ? (obj.religion as string[]) : [],
    avoid_filters: Array.isArray(obj.avoid_filters)
      ? (obj.avoid_filters as string[])
      : [],
  };
}

export function parseLifestyleData(raw: unknown): LifestyleData {
  if (!raw || typeof raw !== "object") return { ...EMPTY_LIFESTYLE_DATA };
  const obj = raw as Record<string, unknown>;
  return {
    activities: Array.isArray(obj.activities) ? (obj.activities as string[]) : [],
    family: Array.isArray(obj.family) ? (obj.family as string[]) : [],
    self_care: Array.isArray(obj.self_care) ? (obj.self_care as string[]) : [],
    drinking: Array.isArray(obj.drinking) ? (obj.drinking as string[]) : [],
    smoking: Array.isArray(obj.smoking) ? (obj.smoking as string[]) : [],
  };
}
