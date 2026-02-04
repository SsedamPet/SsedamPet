import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Home from "../../pages/home/Home";
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
import PostDetailPage from "../../pages/community/PostDetailPage/PostDetailPage.jsx";

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

  return (
    <Routes>
      {/* 인증 영역 (레이아웃 X) */}
      <Route path="/auth/*" element={<AuthRoute />} />

      {/* 보호된 영역 */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/info/registry" element={<Registry />} />

          <Route path="/community" element={<MainCommunity />} />
          <Route path="/community/write" element={<PostWrite />} />
          <Route path="/community/post/:postId" element={<PostDetailPage />} />
          <Route path="/community/comment" element={<CommentSection />} />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/posts" element={<LikedPosts />} />
          <Route path="/pet/add" element={<PetAddRoute />} />

          <Route
            path="/mypage/alert"
            element={
              <>
                <MyPage />
                <AlertModal />
              </>
            }
          />

          <Route path="/healthlog" element={<HealthLog />} />
          <Route path="/chatbot" element={<AiChat />} />
        </Route>
      </Route>

      {/* 나머지는 로그인으로 튕김 */}
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default MainRoute;
