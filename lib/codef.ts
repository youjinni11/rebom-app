import { EasyCodef, EasyCodefConstant } from "easycodef-node";

export interface MaritalVerificationInput {
  name: string;
  birthDate: string; // YYMMDD
  gender?: "male" | "female";
}

export interface MaritalVerificationResult {
  approved: boolean;
  raw: Record<string, unknown>;
  message: string;
}

let codefInstance: EasyCodef | null = null;

function getCodef(): EasyCodef | null {
  const publicKey = process.env.CODEF_PUBLIC_KEY;

  if (!publicKey) {
    return null;
  }

  if (!codefInstance) {
    codefInstance = new EasyCodef();
    codefInstance.setPublicKey(publicKey);

    const clientId = process.env.CODEF_CLIENT_ID;
    const clientSecret = process.env.CODEF_CLIENT_SECRET;
    if (clientId && clientSecret) {
      codefInstance.setClientInfo(clientId, clientSecret);
    }
  }

  return codefInstance;
}

function parseMaritalStatus(response: Record<string, unknown>): boolean {
  const data = (response.data as Record<string, unknown>) ?? response;
  const result = (data.result as Record<string, unknown>) ?? data;

  const maritalStatus =
    result.maritalStatus ??
    result.marriageStatus ??
    result.spouseName ??
    result.spouseNm;

  if (typeof maritalStatus === "string") {
    const lower = maritalStatus.toLowerCase();
    if (lower.includes("미혼") || lower === "single" || lower === "none") {
      return true;
    }
    if (lower.includes("기혼") || lower.includes("이혼") || lower.includes("사별")) {
      return false;
    }
  }

  if (maritalStatus === null || maritalStatus === undefined || maritalStatus === "") {
    return true;
  }

  const marriageRecords = result.marriageRecords ?? result.marriageList;
  if (Array.isArray(marriageRecords) && marriageRecords.length > 0) {
    return false;
  }

  const extraMessage = String(result.extraMessage ?? result.message ?? "");
  if (extraMessage.includes("미혼")) return true;
  if (extraMessage.includes("기혼") || extraMessage.includes("이혼")) return false;

  return true;
}

function mockVerification(input: MaritalVerificationInput): MaritalVerificationResult {
  return {
    approved: true,
    raw: {
      mock: true,
      service: "MOCK_VERIFICATION",
      input,
      data: {
        result: {
          maritalStatus: "미혼",
          extraMessage: "샌드박스 테스트 데이터 (MOCK)",
        },
      },
    },
    message: "미혼 인증이 완료되었습니다. (MOCK 모드)",
  };
}

export async function verifyMaritalStatus(
  input: MaritalVerificationInput
): Promise<MaritalVerificationResult> {
  if (process.env.MOCK_VERIFICATION === "true") {
    return mockVerification(input);
  }

  const codef = getCodef();
  if (!codef) {
    if (process.env.NODE_ENV === "development") {
      return mockVerification(input);
    }
    throw new Error("Codef credentials not configured");
  }

  const endpoint = "/v1/kr/public/ck/family-relations-register/marriage-certificate";

  const params: Record<string, string> = {
    organization: "0001",
    loginType: "0",
    userName: input.name,
    identity: input.birthDate,
    inquiryType: "0",
    isIdentityViewYn: "1",
    isNameViewYn: "1",
    isMarriageViewYn: "1",
    marriageCertificateType: "1",
  };

  if (input.gender) {
    params.identityEncYn = "0";
  }

  try {
    const responseStr = await codef.requestProduct(
      endpoint,
      EasyCodefConstant.SERVICE_TYPE_SANDBOX,
      params
    );

    const parsed =
      typeof responseStr === "string" ? JSON.parse(responseStr) : responseStr;
    const raw = parsed as Record<string, unknown>;
    const approved = parseMaritalStatus(raw);

    return {
      approved,
      raw,
      message: approved
        ? "미혼 인증이 완료되었습니다."
        : "혼인 기록이 확인되어 가입이 제한됩니다.",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Codef API 오류";
    throw new Error(`미혼 검증 실패: ${message}`);
  }
}
