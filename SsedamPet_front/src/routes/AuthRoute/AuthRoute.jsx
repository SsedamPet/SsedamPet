import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainRoute from "../MainRoute/MainRoute";
import { useEffect } from "react";
import Loading from "../../components/common/Loading";
import Login from "../../pages/auth/Login/Login";
import Home from "../../pages/home/Home";
import Signup from "../../pages/auth/Signup/Signup";
import OAuth2 from "../../pages/auth/OAuth2/OAuth2";
import { useMeQuery } from "../../react-query/queries/usersQueries";

function AuthRoute() {
  const meQuery = useMeQuery();
  const navigate = useNavigate();

  useEffect(() => {
  if (!meQuery.isLoading && meQuery.data?.status === 200) {
    navigate("/", { replace: true });
  }
}, [meQuery.isLoading, meQuery.data]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="login/oauth2/success" element={<OAuth2 />} />
      <Route path="signup/oauth2" element={<Signup />} />
    </Routes>
  );
}

export default AuthRoute;
