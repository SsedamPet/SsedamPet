import { css, Global } from "@emotion/react";
import { NoticeProvider, useNotice } from "./contexts/NoticeContext";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import MainFrame from "./components/layout/MainFrame/MainFrame";
import { useMeQuery } from "./react-query/queries/usersQueries";
import Loading from "./components/common/Loading";
import Login from "./pages/auth/Login/Login";
import { useEffect } from "react";
import OAuth2 from "./pages/auth/OAuth2/OAuth2";
import Header from "./components/layout/Header/Header";
import BottomNavBar from "./components/layout/BottomNavBar/BottomNavBar";
import Signup from "./pages/auth/Signup/Signup";
import Registry from "./pages/information/registration/Registry";
import MainCommunity from "./pages/community/MainCommunity/MainCommunity";
import PostWrite from "./pages/community/PostWrite/PostWrite";
import PostDetailPage from "./pages/community/PostDetailPage/PostDetailPage";
import CommentSection from "./pages/community/Comment/CommentSection";
import MyPage from "./pages/mypage/MyPage";
import HealthLog from "./pages/healthlog/HealthLog";
import AiChat from "./pages/aichat/AiChat";
import LikedPosts from "./pages/mypage/posts/LikedPosts";
import PostModal from "./pages/mypage/posts/PostModal";
import PetAddModal from "./pages/mypage/pet/PetAddModal";

const globalStyles = css`
    html {
        background-color: #f0f0f0;
        overflow: hidden;
    }

    html,
    body {
        margin: 0;
        padding: 0;
    }
`;

function PetAddRoute() {
    const navigate = useNavigate();

    return (
        <>
            <MyPage />
            <PetAddModal onClose={() => navigate("/mypage")} />
        </>
    );
}

function PostsModalRoute() {
    const navigate = useNavigate();
    return (
        <>
            <MyPage />
            <PostModal onClose={() => navigate("/mypage")} />
        </>
    );
}

function LikesModalRoute() {
    const navigate = useNavigate();
    return (
        <>
            <MyPage />
            <LikedPosts onClose={() => navigate("/mypage")} />
        </>
    );
}

export default function App() {
    // const { toastMsg, toastVisible, setToastVisible } = useNotice();
    const navigate = useNavigate();
    const location = useLocation();
    const principal = useMeQuery();

    useEffect(() => {
        if (!principal.isLoading && principal.isError) {
            navigate("/auth/login");
        } else if (!principal.isLoading && principal.isSuccess) {
            if (location.pathname.startsWith("/auth")) {
                navigate("/");
            }
        }
    }, [principal.data, principal.isLoading]);

    if (principal.isLoading) {
        return (
            <>
                <Global styles={globalStyles} />
                <Loading />
            </>
        );
    }

    if (principal.isError) {
        return (
            <MainFrame>
                <Global styles={globalStyles} />
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route
                        path="/auth/login/oauth2/success"
                        element={<OAuth2 />}
                    />
                    <Route path="signup/oauth2" element={<Signup />} />
                </Routes>
            </MainFrame>
        );
    }

    if (principal.isSuccess) {
        return (
            <>
                <NoticeProvider>
                    <MainFrame>
                        <Global styles={globalStyles} />
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route
                                path="/info/registry"
                                element={<Registry />}
                            />

                            <Route
                                path="/community"
                                element={<MainCommunity />}
                            />
                            <Route
                                path="/community/write"
                                element={<PostWrite />}
                            />
                            <Route
                                path="/community/post/:postId"
                                element={<PostDetailPage />}
                            />
                            <Route
                                path="/community/comment"
                                element={<CommentSection />}
                            />

                            <Route path="/mypage" element={<MyPage />} />
                            <Route path="/pet/add" element={<PetAddRoute />} />

                            <Route
                                path="/mypage/posts"
                                element={<PostsModalRoute />}
                            />
                            <Route
                                path="/mypage/likes"
                                element={<LikesModalRoute />}
                            />

                            {/* 건강기록 및 챗봇 */}
                            <Route path="/healthlog" element={<HealthLog />} />
                            <Route path="/chatbot" element={<AiChat />} />
                        </Routes>
                        <BottomNavBar />
                    </MainFrame>
                </NoticeProvider>
            </>
        );
    }

    return <></>;
}

{
    /* <Toast
        message={toastMsg}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      /> */
}
