import { api } from "../../configs/axiosConfig";

/**
 * 🔔 최신 알림 목록 조회
 * GET /api/notices/latest
 */
export const getLatestNotices = async ({ limit = 20, offset = 0 } = {}) => {
  const res = await api.get("/api/notices/latest", {
    params: { limit, offset },
  });
  return res.data;
};

/**
 * 🔔 미읽음 알림 개수 (뱃지용)
 * GET /api/notices/unread-count
 */
export const getUnreadCount = async () => {
  const res = await api.get("/api/notices/unread-count");
  return res.data;
};



/**
 * 🔔 알림 단건 읽음 처리
 * PATCH /api/notices/{noticeId}/read
 */
export const readNotice = async (noticeId) => {
  if (!noticeId) return;
  await api.patch(`/api/notices/${noticeId}/read`);
};

/**
 * 🔔 알림 전체 읽음 처리
 * PATCH /api/notices/read-all
 */
export const readAllNotices = async () => {
  await api.patch("/api/notices/read-all");
};

/**
 * ⚠️ SSE 연결은 utils/noticeEventSource.js 에서 담당
 * 이 파일에서는 HTTP API만 관리
 */
