import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { Home, Users, ClipboardList, User } from "lucide-react";

export default function BottomNavBar() {
  const [value, setValue] = React.useState("home");

  // TS 타입(: React.SyntheticEvent, : string)을 제거함
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="홈"
        value="home"
        icon={<Home size={24} />}
      />
      <BottomNavigationAction
        label="커뮤니티"
        value="community"
        icon={<Users size={24} />}
      />
      <BottomNavigationAction
        label="건강기록"
        value="health"
        icon={<ClipboardList size={24} />}
      />
      <BottomNavigationAction
        label="마이페이지"
        value="profile"
        icon={<User size={24} />}
      />
    </BottomNavigation>
  );
}
