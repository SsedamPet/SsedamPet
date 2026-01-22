import { useQuery } from "@tanstack/react-query";
import { requestMe } from "../../apis/users/usersApis";

export const useMeQuery = () => {
  const accessToken = localStorage.getItem("AccessToken");
  // console.log("accessToken:", accessToken);

  return useQuery({
    queryKey: ["me", accessToken],
    queryFn: async () => {
      try {
        const res = await requestMe();
        console.log("requestMe success:", res);
        return res;
      } catch (error) {
        console.log("requestMe error:", error);
        return error?.response ?? { status: 401, data: null };
      }
    },
    retry: false,
    enabled: !!accessToken, // 토큰이 있을 때만 실행 (로그인 전 불필요한 요청 방지)
  });
};
