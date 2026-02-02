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
        console.log("me data:", res.data);
        return res;
      } catch (error) {
        console.log("requestMe error:", error);
        // return error.response;
        throw error;
      }
    },
    retry: 0
  });
};
