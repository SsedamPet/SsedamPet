import { api } from "../../configs/axiosConfig"

export const getMypage = async () => {
    return await api.get("/api/mypage/user");
};

export const getMypageSummary = async () => {
    const res = await api.get("/api/mypage/summary");
    return res.data;
}

export const getMyPets = async () => {
    return await api.get("/api/mypage/pets")
}

export const getMyPosts = async ({ year, month }) => {
    const res = await api.get("/api/mypage/my-posts", {
        params: {year, month},
    });
    return res.data;
};

export const getLikedPosts = async ({ year, month }) => {
    const res = await api.get("/api/mypage/liked-posts", {
        params: {year, month},
    });
    return res.data;
};

// 여기부터 알림



// 알림 목록(최신순)
export const getLatestNotices = async ({ limit = 20, offset = 0 } = {}) => {
    const res = await api.get("/api/notices/latest", { params: { limit, offset } });
    return res.data;
};



// 미읽음 카운트
export const getUnreadCount = async () => {
    const res = await api.get("/api/notices/unread-count");
  return res.data; // 보통 number (예: 3)
};

// 단건 읽음
export const readNotice = async (noticeId) => {
    const res = await api.patch(`/api/notices/${noticeId}/read`);
    return res.data;
};

// 전체 읽음
export const readAllNotices = async () => {
    const res = await api.patch("/api/notices/read-all");
    return res.data;
};
