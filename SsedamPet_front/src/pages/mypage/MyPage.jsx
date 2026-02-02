/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import * as s from "./styles";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar";
import { useMeQuery } from "../../react-query/queries/usersQueries";
import Loading from "../../components/common/Loading";
import { useMyPetsQuery } from "../../react-query/queries/petsQueries";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const API_BASE_URL = "http://localhost:8080";

const MyPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("AccessToken");
  const petsQuery = useMyPetsQuery(!!token);


  
  const { data: me, isLoading, isError } = useMeQuery();
  const { data: pets = [], isLoading: petsLoading } = petsQuery ?? {};
  

  useEffect(() => {
    console.log("me changed:", me);
    
  }, [me]);

  if (isLoading) {
    return (
      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <main css={s.container}>
          <Loading />
        </main>
        <BottomNavBar />
      </div>
    );
  }

  if (!token) {
    return (
      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <main css={s.container}>
          <div style={{ padding: 20 }}>
            로그인 후 마이페이지를 이용할 수 있습니다.
            <button
              onClick={() => window.location.reload()}
              style={{ marginLeft: 10 }}
            >
              새로고침
            </button>
          </div>
        </main>
        <BottomNavBar />
      </div>
    );
  }

  if (isError || !me) {
    return (
      <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
        <main css={s.container}>
          <div style={{ padding: 20 }}>
            내 정보를 불러오지 못했습니다.
            <button
              onClick={() => window.location.reload()}
              style={{ marginLeft: 10 }}
            >
              새로고침
            </button>
          </div>
        </main>
        <BottomNavBar />
      </div>
    );
  }

  const nickname = me?.nickname ?? me?.name ?? "";
  const email = me?.email ?? "";

  const rawUserProfileImgUrl = me?.userProfileImgUrl ?? "";
  const userProfileImgUrl = rawUserProfileImgUrl
    ? rawUserProfileImgUrl.startsWith("http")
      ? rawUserProfileImgUrl
      : `${API_BASE_URL}${rawUserProfileImgUrl}`
    : "";

  const OrangeSyncSVG = ({ size = 12 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 4v6h-6"></path>
      <path d="M1 20v-6h6"></path>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  );

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <main css={s.container}>
        <section css={s.profileSection}>
          <div css={s.topActionIcons}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
              <line x1="12" y1="2" x2="12" y2="12"></line>
            </svg>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>

          <div css={s.userMainInfo}>
            <div className="profile-placeholder">
              {userProfileImgUrl ? (
                <img
                  src={userProfileImgUrl}
                  alt="userProfileImgUrl"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                "🐱"
              )}
              <div css={s.orangeBadge}>
                <OrangeSyncSVG size={12} />
              </div>
            </div>

            <div className="user-text">
              <div className="name">{`${nickname} 님`}</div>
              <div className="email">{email}</div>
            </div>
          </div>

          <div css={s.statsContainer}>
            <div css={s.statBox} onClick={() => navigate("/mypage/posts")} style={{ cursor: "pointer" }}>
              <span className="count">0</span>
              <span className="label">게시물</span>
            </div>
            <div css={s.statBox} onClick={() => navigate("/mypage/likes")} style={{ cursor: "pointer" }}>
              <span className="count">0</span>
              <span className="label">좋아요</span>
            </div>
          </div>
        </section>

        <section>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 10px",
            }}
          >
            <span style={{ fontSize: "19px", fontWeight: "800", color: "#2D4028" }}>
              🐾 내 반려동물
            </span>
            <> 
              <button
                onClick={() => {
                  if (pets.length >= 3) {
                    alert("반려동물은 최대 3마리까지 등록할 수 있습니다.");
                    return;
                  }
                  navigate("/pet/add"); // 👈 세미콜론 위치 확인
                }} // 👈 함수를 여기서 깔끔하게 닫아줍니다
                style={{
                  background: "#b2ebaf",
                  border: "none",
                  padding: "6px 18px",
                  borderRadius: "15px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                + 추가
              </button>

            </>
          </div>

          <div css={s.petListContainer}>
            {petsLoading ? (
              <div>불러오는중..</div>
            ) : pets.length === 0 ? (
              <div>등록된 반려동물이 없습니다.</div>
            ) : (
                pets.slice(0, 3).map((pet) => {
                const petProfileImgUrl = resolveImageUrl(pet.petProfileImgUrl, API_BASE_URL);

                return (
                  <div key={pet.petId} css={s.petCard}>
                    <div className="pet-info">
                      <div className="pet-circle">
                        {petProfileImgUrl ? (
                          <img
                            src={petProfileImgUrl} 
                            alt={pet.petName} 
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                            // ✅ 이미지 로드 실패하면 fallback(이모지) 보이게끔 이미지 숨김
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          "🐶"
                        )}

                        <div
                          css={s.orangeBadge}
                          style={{
                            width: "18px",
                            height: "18px",
                            bottom: "-2px",
                            right: "-2px",
                          }}
                        >
                          <OrangeSyncSVG size={10} />
                        </div>
                      </div>

                      <div>
                        <div className="p-name">
                          {pet.petName}{" "}
                          {pet.petAge ? `${pet.petAge}세` : ""}{" "}
                          {pet.petGender === "M"
                            ? "♂"
                            : pet.petGender === "F"
                            ? "♀"
                            : ""}
                        </div>
                        <div className="p-desc">{pet.petBreed ?? ""}</div>
                      </div>
                    </div>

                    <button className="edit-btn">편집</button>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>

      <BottomNavBar />
      <Outlet />
    </div>
  );
};

export default MyPage;
