export const resolveImageUrl = (url, apiBaseUrl = "http://localhost:8080") => {
    if (!url) return "";

  // 양쪽 따옴표가 섞여 들어온 케이스 제거 (\"C:\...\" 같은 것)
    const cleaned = String(url).replace(/^"+|"+$/g, "");

  // 이미 절대 URL이면 그대로
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) return cleaned;

  // /image/... 같은 서버 상대경로면 baseURL 붙이기
    if (cleaned.startsWith("/")) return `${apiBaseUrl}${cleaned}`;

  // windows 경로(C:\...)는 프론트에서 직접 접근 불가 → 빈 문자열 처리(기본 이미지로 대체)
    if (/^[a-zA-Z]:\\/.test(cleaned)) return "";

  // 그 외는 일단 baseURL 붙여 시도 (상황에 따라 조정)
    return `${apiBaseUrl}/${cleaned}`;
};
