import { Routes, Route, useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Home from "../../pages/home/Home";
import OAuth2 from "../../pages/auth/OAuth2/OAuth2";
import Login from "../../pages/auth/Login/Login";
import Signup from "../../pages/auth/Signup/Signup";
import Registry from "../../pages/information/registration/Registry";
import CommunityMain from "../../pages/community/communitymain/CommunityMain";
import PostWrite from "../../pages/community/PostWrite/PostWrite";
import MyPage from "../../pages/mypage/MyPage";
import LikedPosts from "../../pages/mypage/posts/LikedPosts";
import PostModal from "../../pages/mypage/posts/PostModal";
import PetAddModal from "../../pages/mypage/pet/PetAddModal";
import ChatBot from "../../pages/Chatbot/ChatBot";
import AlertModal from "../../pages/mypage/alert/AlertModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CommentSection from "../../pages/community/Comment/CommentSection";
import HealthLog from "../../pages/Healthlog/HealthLog";

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
      <Route element={<MainLayout />}>
        {/* 로그인 없이 접근 가능 */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        <Route path="/auth/login/oauth2/success" element={<OAuth2 />} />
        <Route path="/" element={<Home />} />


        {/* 로그인 필수 영역 */}
        <Route element={<ProtectedRoute />}>
          {/* 정보 관리 페이지들 */}
          <Route path="/info/registry" element={<Registry />} />

          {/* 커뮤니티 페이지들 */}
          <Route path="/community" element={<CommunityMain />} />
          <Route path="/community/write" element={<PostWrite />} />
          <Route path="/community/comment" element={<CommentSection />} />

          {/* 마이페이지 */}
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
          {/* 건강기록 및 챗봇 */}
          <Route path="/healthlog" element={<HealthLog />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoute;
