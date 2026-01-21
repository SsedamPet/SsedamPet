import { Home } from "lucide-react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainRoute from "../MainRoute/MainRoute";
import { useMeQuery } from "../../react-query/queries/usersQueries";
import { useEffect } from "react";
import Loading from "../../components/common/Loading";

function AuthRoute() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const meQuery = useMeQuery();

  useEffect(() => {
    if (!meQuery.isLoading) {
      if (meQuery.data?.status !== 200) {
        // 비로그인 상태일 때 /auth 로 시작하지 않는 주소로 오면 로그인으로 보냄
        if (!pathname.startsWith("/auth")) {
          navigate("/auth/login");
        }
      } else {
        // 로그인 상태일 때 /auth 주소로 오면 홈으로 보냄
        if (pathname.startsWith("/auth")) {
          navigate("/");
        }
      }
    }
  }, [pathname, meQuery.data, meQuery.isLoading]);

  // 1. 로딩 중 처리
  if (meQuery.isLoading) {
    return <Loading />;
  }

  // 2. 실패한 경우 (비로그인 상태) - 요청하신 대로 여기서 직접 리턴
  if (meQuery.isSuccess && meQuery.data?.status !== 200) {
    return (
      <Routes>
        {/* <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/login/oauth2" element={<OAuth2 />} /> */}
        {/* 필요한 비로그인 전용 페이지(회원가입 등)를 여기에 추가 */}
      </Routes>
    );
  }

  // 3. 로그인 상태 - MainRoute(사이드바 + 홈/커뮤니티 등)를 보여줌
  return <MainRoute />;
}

export default AuthRoute;
