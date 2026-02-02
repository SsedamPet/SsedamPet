import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainRoute from "../MainRoute/MainRoute";
import { useEffect } from "react";
import Loading from "../../components/common/Loading";
import Login from "../../pages/auth/Login/Login";
import Home from "../../pages/home/Home";
import Signup from "../../pages/auth/Signup/Signup";
import OAuth2 from "../../pages/auth/OAuth2/OAuth2";
import { useMeQuery } from "../../react-query/queries/usersQueries";

const UserRegistration = () => <div>유저 정보 입력 페이지 디자인</div>;
const PetRegistration = () => <div>반려동물 등록 페이지 디자인</div>;

function AuthRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const meQuery = useMeQuery();
  console.log(meQuery.isLoading);
  console.log(meQuery.data);

  const serverStatus = meQuery.data?.status;

  useEffect(() => {
    const isNotLoggedIn =
      !meQuery.isLoading && (!meQuery.data || serverStatus !== 200);
    if (isNotLoggedIn && !location.pathname.startsWith("/auth/")) {
      navigate("/auth/login", { replace: true });
    }
  }, [
    meQuery.isLoading,
    meQuery.data,
    serverStatus,
    location.pathname,
    navigate,
  ]);

  if (meQuery.isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="login/oauth2/success" element={<OAuth2 />} />
      <Route path="signup/oauth2" element={<Signup />} />
    </Routes>
  );
}

export default AuthRoute;
