import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Home from "../../pages/Home/Home";

function MainRoute() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 정보 관리 페이지들 */}
      {/* <Route path="/info/pet" element={<PetInformation />} />
        <Route path="/info/profile" element={<ProfileInformation />} />
        <Route path="/info/user" element={<UserInformation />} /> */}
      {/* 커뮤니티 페이지들 */}
      {/* <Route path="/community" element={<CommunityMain />} /> 
        <Route path="/community/write" element={<PostWrite />} />
        <Route path="/community/comment" element={<CommentSection />} /> */}
      </Routes>
    </MainLayout>
  );
}

export default MainRoute;
