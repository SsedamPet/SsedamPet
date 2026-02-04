/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useNotice } from "../../../contexts/NoticeContext";
import { useReadNoticeMutation, useReadAllNoticesMutation } from "../../../react-query/queries/noticesQueries";

const NoticeModal = ({ open, onClose }) => {
    const { notices, setNotices, setUnreadCount } = useNotice();
    const readOne = useReadNoticeMutation();
    const readAll = useReadAllNoticesMutation();

    if (!open) return null;

    const handleReadOne = (noticeId, linkUrl) => {
        readOne.mutate(noticeId);

        // UI 즉시 반영: isRead를 1로 변경
        setNotices((prev) =>
            prev.map((n) => (n.noticeId === noticeId ? { ...n, isRead: 1 } : n))
        );

        // unreadCount 1 감소 (0 아래로 내려가지 않게)
        setUnreadCount((c) => Math.max(0, c - 1));

        if (linkUrl) window.location.href = linkUrl;
    };

    const handleReadAll = () => {
    
    readAll.mutate();

    
    setNotices((prev) => prev.map((n) => ({ ...n, isRead: 1 })));
    setUnreadCount(0);
    };


    return (
    <div css={s.overlay} onClick={onClose}>
        <div css={s.modal} onClick={(e) => e.stopPropagation()}>
            <div css={s.header}>
                <div css={s.title}>알림</div>

                <button
                    css={s.readAllBtn}
                    onClick={handleReadAll}
                    type="button"
                >
                    전체 읽음
                </button>
            </div>

            <div css={s.list}>
                {notices.length === 0 ? (
                    <div css={s.empty}>알림이 없습니다.</div>
                ) : (
                    notices.map((n) => (
                        <div
                            key={n.noticeId}
                            css={s.item(n.isRead)} // isRead 값에 따라 스타일(선택)
                            onClick={() => handleReadOne(n.noticeId, n.linkUrl)}
                        >
                            <div css={s.msg}>{n.noticeMessage}</div>
                            <div css={s.meta}>
                                <span>{n.createdDt}</span>
                                {n.isRead === 2 && <span css={s.unreadDot} />}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button css={s.closeBtn} onClick={onClose} type="button">
                닫기
            </button>
        </div>
    </div>
    );
};

export default NoticeModal;
