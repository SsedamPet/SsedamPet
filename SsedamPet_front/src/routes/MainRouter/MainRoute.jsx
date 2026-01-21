import { Routes, Route } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Home from "../../pages/Home/Home";

function MainRoute() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default MainRoute;
