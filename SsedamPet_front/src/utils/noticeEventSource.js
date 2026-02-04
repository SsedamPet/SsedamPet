const API_BASE_URL = "http://localhost:8080";

// EventSource 연결(token query)

export const connectNoticeSSE = ({ onOpen, onNotice, onError }) => {
    const token = localStorage.getItem("AccessToken");
    if (!token) return null;

    const url = `${API_BASE_URL}/api/notices/stream?token=${encodeURIComponent(token)}`;
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
        onOpen?.();
    };

    // const noticeHandler = (e) => {
    // try {
    //     const data = JSON.parse(e.data);
    //     onNotice?.(data);
    // } catch {
    //     onNotice?.(e.data);
    
    // }
    // };
    // notice 이벤트만 수신 (서버: event().name("notice"))
    eventSource.addEventListener("notice", (e) => {
        try {
            const data = JSON.parse(e.data);
            onNotice?.(data);
        } catch {
            onNotice?.(e.data);
        }
    });



    eventSource.onmessage = (e) => {
    // NoticeService에서 event().name("notice")로 보내면 onmessage로도 들어오고,
    // name 기반 리스너를 쓰고 싶으면 addEventListener("notice")도 가능
        try {
            const data = JSON.parse(e.data);
            onNotice?.(data);
        } catch {
            onNotice?.(e.data);
        }
    };

    eventSource.onerror = (err) => {
        onError?.(err);
    // EventSource는 브라우저가 자동 재연결 시도함
    };

    return eventSource;
};