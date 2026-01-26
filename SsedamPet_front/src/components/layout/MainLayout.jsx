import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import BottomNavBar from "./BottomNavBar/BottomNavBar";

function MainLayout() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Header />
      <main style={{ width: "100%", maxWidth: "600px", paddingBottom: "80px" }}>
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
}

export default MainLayout;
