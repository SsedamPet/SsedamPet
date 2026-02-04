import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeQuery } from "../../../react-query/queries/usersQueries";

function OAuth2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    // 1. URL에 토큰이 들어왔는지 확인
    if (accessToken && accessToken !== "null") {
      // 2. 🚨 즉시 저장 (다른 생각 하지 말고 바로 저장!)
      localStorage.setItem("AccessToken", accessToken);

      // 3. 🚀 유저 정보를 서버에서 가져오길 기다리지 않고 바로 메인('/')으로 보냄
      // replace: true를 써야 뒤로가기를 해도 이 화면으로 다시 안 돌아옵니다.
      navigate("/", { replace: true });
    } else {
      // 토큰이 없으면 로그인 페이지로 퇴출
      navigate("/auth/login", { replace: true });
    }
  }, [accessToken, navigate]);

  // 4. "로그인 중입니다" 문구조차 보여주지 않도록 null 반환
  // 사용자는 이 컴포넌트가 떴는지조차 모르게 됩니다.
  return null;
}

export default OAuth2;
