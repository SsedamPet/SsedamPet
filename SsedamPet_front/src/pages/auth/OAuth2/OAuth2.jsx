import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeQuery } from "../../../react-query/queries/usersQueries";

function OAuth2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const accessToken = searchParams.get("accessToken");
  const { data, isLoading, isSuccess, isError } = useMeQuery(); 

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("AccessToken", accessToken);
      console.log("토큰 저장 완료!");
      queryClient.invalidateQueries(["me"]);
    }
  }, [accessToken, queryClient]);

  useEffect(() => {
    // 3. 유저 정보를 성공적으로 가져왔다면 메인으로 이동
    if (isSuccess && data?.status === 200) {
      navigate("/", { replace: true });
    }
    // 4. 에러 발생 시에만 로그인 페이지로 유도 (회원가입 중일 땐 실행되지 않음)
    if (isError) {
      localStorage.removeItem("AccessToken");
      navigate("/auth/login", { replace: true });
    }
  }, [data, isLoading, navigate]);

  return <div>로그인 중입니다...</div>;
}

export default OAuth2;
