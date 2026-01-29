/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Outlet 추가
import * as s from "./styles";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar";
import { useMeQuery } from "../../react-query/queries/usersQueries";

const MyPage = () => {
  const navigate = useNavigate();

  const { data: me, isLoading, isError }= useMeQuery();

  const nickname = me?.nickname ?? me?.name ?? "";
  const email = me?.email ?? "";
  const userProfileImgUrl = me?.userProfileImgUrl ?? "";

  // 공통 주황색 새로고침 SVG
  const OrangeSyncSVG = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6"></path>
      <path d="M1 20v-6h6"></path>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
      <main css={s.container}>
        <section css={s.profileSection}>
          <div css={s.topActionIcons}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </div>

          <div css={s.userMainInfo}>
            <div className="profile-placeholder">
              {userProfileImgUrl ? ( <img src={userProfileImgUrl} alt="userProfileImgUrl" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
                /> ) : ( "🐱" )}
              <div css={s.orangeBadge}><OrangeSyncSVG size={12} /></div>
            </div>
            <div className="user-text">
              <div className="name">{`${nickname} 님`}</div>
              <div className="email">{`${email}`}</div>
            </div>
          </div>

          <div css={s.statsContainer}>
            <div css={s.statBox}><span className="count">0</span><span className="label">게시물</span></div>
            <div css={s.statBox}><span className="count">0</span><span className="label">좋아요</span></div>
          </div>
        </section>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
            <span style={{ fontSize: '19px', fontWeight: '800', color: '#2D4028' }}>🐾 내 반려동물</span>
            {/* 버튼 클릭 시 해당 경로로 이동하여 모달을 띄움 */}
            <button 
              onClick={() => navigate("/pet/add")}
              style={{ background: '#b2ebaf', border: 'none', padding: '6px 18px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              + 추가
            </button>
          </div>

          <div css={s.petListContainer}>
            <div css={s.petCard}>
              <div className="pet-info">
                <div className="pet-circle">
                  🐶
                  <div css={s.orangeBadge} style={{ width: '18px', height: '18px', bottom: '-2px', right: '-2px' }}>
                    <OrangeSyncSVG size={10} />
                  </div>
                </div>
                <div>
                  <div className="p-name">고양이 2세 ♂</div>
                  <div className="p-desc">오늘 하루도 행복하다냥</div>
                </div>
              </div>
              <button className="edit-btn">편집</button>
            </div>
          </div>
        </section>
      </main>
      <BottomNavBar />
      <Outlet />
    </div>
  );
};

export default MyPage;