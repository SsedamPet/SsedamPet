import LoginPage from "../pages/login/LoginPage.jsx"; 
import SignupPage from "../pages/signup/SignupPage.jsx";

<Routes>
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
</Routes>

export default RootRoute;