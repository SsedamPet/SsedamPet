/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import { useLikedPostsQuery } from "../../../react-query/queries/mypagePostsQueries";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";

const API_BASE_URL = "http://localhost:8080";

const pad2 = (n) => String(n).padStart(2, "0");

const prevMonth = ({ year, month }) =>
  month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };

const nextMonth = ({ year, month }) =>
  month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };

const LikedPosts = ({ onClose }) => {
  const navigate = useNavigate();

  const [yearMonth, setYearMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });

  const { data, isLoading } = useLikedPostsQuery(true);

  const posts = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const monthKey = `${yearMonth.year}-${pad2(yearMonth.month)}`;

  const filteredDate = useMemo(() => {
    // 좋아요한 게시물도 createdDt 기준으로 월 필터링
    return posts.filter((p) => String(p?.createdDt ?? "").startsWith(monthKey));
  }, [posts, monthKey]);

  const gridItems = useMemo(() => {
    const sliced = filteredDate.slice(0, 12);
    return Array.from({ length: 12 }, (_, i) => sliced[i] ?? null);
  }, [filteredDate]);

  const handleGoCommunity = () => {
    onClose?.();
    navigate("/community");
  };

  return (
    <div css={s.modalOverlay} onClick={onClose}>
      <div css={s.container} onClick={(e) => e.stopPropagation()}>
        <div css={s.monthNav}>
          <span css={s.monthArrow} onClick={() => setYearMonth(prevMonth)}>
            ◀
          </span>
          <span css={s.monthTitle}>
            {yearMonth.year} / {pad2(yearMonth.month)}
          </span>
          <span css={s.monthArrow} onClick={() => setYearMonth(nextMonth)}>
            ▶
          </span>
        </div>

        <div css={s.postListContainer}>
          {isLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} css={s.postItem} />
            ))
          ) : (
            gridItems.map((p, i) => {
              const imgUrl = p?.postImgUrl
                ? resolveImageUrl(p.postImgUrl, API_BASE_URL)
                : "";

              return (
                <div key={p?.postId ?? `empty-${i}`} css={s.postItem}>
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt=""
                      css={s.postImg}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>

        <div
          css={s.footerDots}
          onClick={handleGoCommunity}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleGoCommunity();
          }}
        >
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    </div>
  );
};

export default LikedPosts;
