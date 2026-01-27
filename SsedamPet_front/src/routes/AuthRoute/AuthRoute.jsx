import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainRoute from "../MainRoute/MainRoute";
// import { useMeQuery } from "../../react-query/queries/usersQueries";
import { useEffect } from "react";
// import Loading from "../../components/common/Loading";
import Login from "../../pages/auth/Login/Login";
import Home from "../../pages/home/Home";
import Signup from "../../pages/auth/Signup/Signup";
import OAuth2 from "../../pages/auth/OAuth2/OAuth2";
import { useMeQuery } from "../../react-query/queries/usersQueries";
import Loading from "../../components/common/Loading";

// const UserRegistration = () => <div>유저 정보 입력 페이지 디자인</div>;
// const PetRegistration = () => <div>반려동물 등록 페이지 디자인</div>;

function AuthRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const meQuery = useMeQuery();
  console.log(meQuery.isLoading)
  console.log(meQuery.data)

  useEffect(() => {
    if (meQuery.status !== 200 && !location.pathname.startsWith("/auth/")) {
      navigate("/auth/login");
    }
  }, [location.pathname]);

  if (meQuery.isLoading) {
    return <Loading />
  }

  if (meQuery.status !== 200) {
    return <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/login/oauth2/success" element={<OAuth2 />} /> 
      <Route path="/auth/signup/oauth2" element={<Signup />} /> 
    </Routes>
  }

  // return (
  //   <Routes>
  //     {/* 정보 미입력 시 보여줄 페이지들 */}
  //     <Route path="/auth/signup" element={<Signup />} />
  //     <Route path="/auth/signup/pet" element={<PetRegistration />} /> 

  //     {/* 모든 정보 입력 후 접근 가능한 메인 서비스 */}
  //     <Route path="/*" element={<MainRoute />} />
  //   </Routes>
  // );

  // const meQuery = { isLoading: false };
  // const user = meQuery.data?.data;
  // const isAuthenticated = meQuery.data?.status === 200;



  // // 1. 비로그인 상태
  // if (!isAuthenticated) {
  //   return (
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/auth/login" element={<Login />} />
  //     </Routes>
  //   );
  // }

  // // 2. 로그인 상태 (추가 정보 입력 단계 포함)
  // return (
  //   <Routes>
  //     <Route path="/auth/oauth2/success" element={<OAuth2 />} /> 
  //     <Route path="/auth/signup/details" element={<OAuth2 />} /> 

  //     {/* 정보 미입력 시 보여줄 페이지들 */}
  //     <Route path="/auth/signup" element={<Signup />} />
  //     <Route path="/auth/signup/details" element={<UserRegistration />} /> 
  //     <Route path="/auth/signup/pet" element={<PetRegistration />} /> 

  //     {/* 모든 정보 입력 후 접근 가능한 메인 서비스 */}
  //     <Route path="/*" element={<MainRoute />} />
  //   </Routes>
  // );
}

export default AuthRoute;
