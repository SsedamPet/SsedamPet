import { Routes, Route } from "react-router-dom";
import MainLayout from "../../pages/components/layout/MainLayout"; 
import Home from "../../pages/home/Home";
// import PetInformation from "../../pages/info/PetInformation";
// import ProfileInformation from "../../pages/info/ProfileInformation";
// import UserInformation from "../../pages/info/UserInformation";
import CommunityMain from "../../pages/community/communitymain/CommunityMain";
import PostWrite from "../../pages/community/write/PostWrite";
import CommentSection from "../../pages/community/comment/CommentSection";

function MainRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* 정보 관리 페이지들 */}
        {/* <Route path="/info/pet" element={<PetInformation />} />
        <Route path="/info/profile" element={<ProfileInformation />} />
        <Route path="/info/user" element={<UserInformation />} /> */}
        {/* 커뮤니티 페이지들 */}
        <Route path="/community" element={<CommunityMain />} /> 
        <Route path="/community/write" element={<PostWrite />} />
        <Route path="/community/comment" element={<CommentSection />} />
      </Route>
    </Routes>
  );
}

export default MainRoute;