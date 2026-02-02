import { Routes, Route, useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Home from "../../pages/home/Home";
import OAuth2 from "../../pages/auth/OAuth2/OAuth2";
import Login from "../../pages/auth/Login/Login";
import Signup from "../../pages/auth/Signup/Signup";
import Registry from "../../pages/information/registration/Registry";
import MyPage from "../../pages/mypage/MyPage";
import LikedPosts from "../../pages/mypage/posts/LikedPosts";
import PetAddModal from "../../pages/mypage/pet/PetAddModal";
import AlertModal from "../../pages/mypage/alert/AlertModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PostWrite from "../../pages/community/PostWrite/PostWrite.jsx";
import CommentSection from "../../pages/community/Comment/CommentSection.jsx";
import MainCommunity from "../../pages/community/MainCommunity/MainCommunity.jsx";
import AiChat from "../../pages/aichat/AiChat.jsx";
import HealthLog from "../../pages/healthlog/HealthLog.jsx";
import AuthRoute from "../AuthRoute/AuthRoute.jsx";
import PostModal from "../../pages/mypage/posts/PostModal.jsx";



function MainRoute() {
  
  function PetAddRoute() {
    const navigate = useNavigate();

    return (
      <>
        <MyPage />
        <PetAddModal onClose={() => navigate(-1)} />
      </>
    );
  }

  function PostsModalRoute() {
  const navigate = useNavigate();
  return (
    <>
      <MyPage />
      <PostModal onClose={() => navigate(-1)} />
    </>
  );
}

  function LikesModalRoute() {
    const navigate = useNavigate();
    return (
      <>
        <MyPage />
        <LikedPosts onClose={() => navigate(-1)} />
      </>
    );
  }

  function AlertModalRoute() {
    const navigate = useNavigate();
    return (
      <>
        <MyPage />
        <AlertModal onClose={() => navigate(-1)} />
      </>
    );
  }


  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/auth/*" element={<AuthRoute />} />
        <Route path="/" element={<Home />} />


        {/* 로그인 필수 영역 */}
        <Route element={<ProtectedRoute />}>
          {/* 정보 관리 페이지들 */}
          <Route path="/info/registry" element={<Registry />} />

          {/* 커뮤니티 페이지들 */}
          <Route path="/community" element={<MainCommunity />} />
          <Route path="/community/write" element={<PostWrite />} />
          <Route path="/community/comment" element={<CommentSection />} />

          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/pet/add" element={<PetAddRoute />} />

          <Route path="/mypage/posts" element={<PostsModalRoute />} />
          <Route path="/mypage/likes" element={<LikesModalRoute />} />

          {/* 건강기록 및 챗봇 */}
          <Route path="/healthlog" element={<HealthLog />} />
          <Route path="/chatbot" element={<AiChat />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoute;
