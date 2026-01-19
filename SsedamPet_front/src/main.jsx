import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/login/LoginPage.jsx"; 
import SignupPage from "./pages/signup/SignupPage.jsx";

const RootRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
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