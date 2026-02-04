import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { connectNoticeSSE } from "../utils/noticeEventSource";
import { getLatestNotices, getUnreadCount } from "../apis/notices/noticesApi";

const NoticeContext = createContext(null);
export const useNotice = () => useContext(NoticeContext);



export const NoticeProvider = ({ children }) => {
    const [notices, setNotices] = useState([]);         // ✅ [추가] 알림 리스트
    const [unreadCount, setUnreadCount] = useState(0);  // ✅ [추가] 미읽음 뱃지 숫자
    
    // 토스트 상태
    const [toastMsg, setToastMsg] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    const eventSourceRef  = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("AccessToken");
        if (!token) return;

        // 초기 동기화: 목록/카운트 불러오기
        (async () => {
            try {
                const [list, cnt] = await Promise.all([
                    getLatestNotices({ limit: 20, offset: 0 }),
                    getUnreadCount(),
                ]);
            setNotices(Array.isArray(list) ? list : []);
            setUnreadCount(typeof cnt === "number" ? cnt : 0);
            } catch (e) {
                console.log("notice init sync error:", e);
            }
        })();

        // SSE 연결(notice 이벤트만 수신)
        const eventSource = connectNoticeSSE({
            onOpen: () => console.log("✅ notice sse connected"),
            onNotice: (notice) => {
                if (!notice || typeof notice !== "object") return;

                setNotices((prev) => [notice, ...prev]);
                setUnreadCount((c) => c + 1);

                // ✅ [추가] 토스트 띄우기 (메시지 키는 너희 DTO에 맞춰)
                const msg = notice.noticeMessage ?? notice.title ?? "새 알림이 도착했어요";
                setToastMsg(msg);
                setToastVisible(true);
                
            },

        });

        eventSourceRef.current = eventSource;

        return () => {
            // ✅ [수정] eventSource.current가 아니라 eventSourceRef.current를 참조해야 함
            // ✅ 변수 eventSource에 .current 속성이 없기 때문에 발생하던 오류를 해결
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
                console.log("🚀 notice sse disconnected");
            }
        };
    }, []);


const value = useMemo(
    () => ({
        notices,
        unreadCount,
        toastMsg,              
        toastVisible,          
        setToastVisible,   
        setUnreadCount,
        setNotices,    
    }),
    [notices, unreadCount, toastMsg, toastVisible]
);

    return <NoticeContext.Provider value={value}>{children}</NoticeContext.Provider>;
};
