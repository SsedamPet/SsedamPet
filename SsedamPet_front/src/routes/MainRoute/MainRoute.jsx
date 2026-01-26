import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Home from "../../pages/home/Home";
import Login from "../../pages/auth/Login/Login";
import Signup from "../../pages/auth/Signup/Signup";
import Registry from "../../pages/information/registration/Registry";
import CommunityMain from "../../pages/community/communitymain/CommunityMain";
import PostWrite from "../../pages/community/PostWrite/PostWrite";
import CommentSection from "../../pages/community/comment/CommentSection";
import MyPage from "../../pages/mypage/MyPage";
import LikedPosts from "../../pages/mypage/posts/LikedPosts";
import PostModal from "../../pages/mypage/posts/PostModal";
import PetAddModal from "../../pages/mypage/pet/PetAddModal";
import ChatBot from "../../pages/chatbot/ChatBot";
import AlertModal from "../../pages/mypage/alert/AlertModal";
import HealthLog from "../../pages/healthlog/HealthLog";
// import HealthLog from "../../pages/checklist/Checklist";

function MainRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 정보 관리 페이지들 */}
        <Route path="/info/registry" element={<Registry />} />

        {/* 커뮤니티 페이지들 */}
        <Route path="/community" element={<CommunityMain />} />
        <Route path="/community/write" element={<PostWrite />} />
        <Route path="/community/comment" element={<CommentSection />} />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/posts" element={<LikedPosts />} />
        <Route
          path="/pet/add"
          element={
            <>
              <MyPage />
              <PetAddModal />
            </>
          }
        />
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
        <Route path="/chatbot" element={<ChatBot />} />
      </Route>
    </Routes>
  );
}

export default MainRoute;
