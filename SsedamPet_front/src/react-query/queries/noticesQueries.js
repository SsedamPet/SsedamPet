import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readAllNotices, readNotice } from "../../apis/notices/noticesApi";

/**
 * ✅ 알림 단건 읽음 처리 mutation
 * - 성공 시:
 *   1) notices 캐시/상태 최신화
 *   2) unreadCount도 다시 가져오거나, 프론트 상태에서 감소 처리(선택)
 *
 * 지금은 가장 안전하게 "invalidate" 방식으로 처리
 */
export const useReadNoticeMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (noticeId) => readNotice(noticeId),

    onSuccess: () => {
      // ✅ 알림 목록, 미읽음 카운트 다시 동기화하고 싶으면 queryKey를 맞춰 invalidate
      // (현재 NoticeContext가 직접 state로 들고 있으니, 최소한 서버데이터 query만 갱신)
      qc.invalidateQueries({ queryKey: ["unreadCount"] });
      qc.invalidateQueries({ queryKey: ["latestNotices"] });
    },
  });
};

/**
 * ✅ 알림 전체 읽음 처리 mutation
 */
export const useReadAllNoticesMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => readAllNotices(),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["unreadCount"] });
      qc.invalidateQueries({ queryKey: ["latestNotices"] });
    },
  });
};
