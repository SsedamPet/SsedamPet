import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMeQuery } from "../../../react-query/queries/usersQueries";

function OAuth2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");

  if (!!accessToken) {
    localStorage.setItem("AccessToken", accessToken);
  }

  const { data, isLoading, isError } = useMeQuery();

  useEffect(() => {
    if (isLoading) return;

    if (accessToken) {
      // 2. 지갑(LocalStorage)에 저장
      localStorage.setItem("AccessToken", accessToken);
      console.log("토큰 저장 완료!");

      if (data && data.status === 200) {
        // 3. 현재 주소 확인 (추가 정보 입력이 필요한 경우인지 체크)
        const isSignupDetails = window.location.pathname.includes("details");
        if (isSignupDetails) {
          alert("추가 정보 입력이 필요합니다.");
          navigate("/auth/signup/details"); // 회원가입 상세 페이지로 이동
        } else {
          alert("로그인 성공!");
          navigate("/"); // 메인 페이지로 이동
        }
      } else {
        alert("인증에 실패하였습니다.");
        navigate("/auth/login"); // 실패 시 로그인 페이지로
      }
    }
  }, [data, isLoading, navigate]);

  return <></>;
}

export default OAuth2;
