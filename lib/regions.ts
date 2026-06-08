/** MVP 초기 타겟: 서울 강남권 (강남·서초·송파 통합) */
export const REGIONS = ["서울 강남"] as const;

export const DEFAULT_REGION = "서울 강남";

export type Region = (typeof REGIONS)[number];
