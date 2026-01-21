import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/login/LoginPage.jsx"; 
import SignupPage from "./pages/signup/SignupPage.jsx";
import MainHomePage from './pages/mainhomepage/MainHomePage.jsx';
import PetInformation from './pages/information/pet/PetInformation.jsx';
import UserInformation from './pages/information/user/UserInformation.jsx'; // 2-5 상세입력
import ProfileInformation from './pages/information/profile/ProfileInformation.jsx'; // 2-4 이미지설정

const RootRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/mainhome" element={<MainHomePage />} />
            <Route path="/info/pet" element={<PetInformation />} />
            <Route path="/info/user" element={<UserInformation />} />
            <Route path="/info/profile" element={<ProfileInformation />} />
        </Routes>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootRoute />
    </BrowserRouter>
  </React.StrictMode>
);