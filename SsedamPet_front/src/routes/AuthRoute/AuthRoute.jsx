import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainRoute from "../MainRoute/MainRoute";
import { useMeQuery } from "../../react-query/queries/usersQueries";
import { useEffect } from "react";
import Loading from "../../components/common/Loading";
import Login from "../../pages/auth/Login/Login";
import Home from "../../pages/Home/Home";
import Signup from "../../pages/auth/Signup/Signup";

function AuthRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const meQuery = useMeQuery();
  const user = meQuery.data?.data;
  const isAuthenticated = meQuery.data?.status === 200;

  useEffect(() => {
    if (!meQuery.isLoading) {
      if (!isAuthenticated) {
        // 비로그인 시 /auth 로 시작하지 않으면 홈으로
        if (!pathname.startsWith("/auth")) {
          navigate("/");
        }
      } else {
        // 로그인 상태인데 닉네임이 없다면 (신규 가입)
        if (!user?.nickname && pathname !== "/auth/signup/details") {
          navigate("/auth/signup/details");
        }
        // 닉네임은 있는데 반려동물 정보가 없다면
        else if (
          user?.nickname &&
          !user?.hasPet &&
          pathname !== "/auth/signup/pet"
        ) {
          navigate("/auth/signup/pet");
        }
        // 모든 정보가 있으면 /auth 접근 시 홈으로
        else if (
          user?.nickname &&
          user?.hasPet &&
          pathname.startsWith("/auth")
        ) {
          navigate("/");
        }
      }
    }
  }, [pathname, user, isAuthenticated, meQuery.isLoading]);

  if (meQuery.isLoading) return <Loading />;

  // 1. 비로그인 상태
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    );
  }

  // 2. 로그인 상태 (추가 정보 입력 단계 포함)
  return (
    <Routes>
      {/* 정보 미입력 시 보여줄 페이지들 */}
      <Route path="/auth/signup" element={<Signup />} />
      {/* <Route path="/auth/signup/details" element={<UserRegistration />} /> */}
      {/* <Route path="/auth/signup/pet" element={<PetRegistration />} /> */}

      {/* 모든 정보 입력 후 접근 가능한 메인 서비스 */}
      <Route path="/*" element={<MainRoute />} />
    </Routes>
  );
}

export default AuthRoute;
