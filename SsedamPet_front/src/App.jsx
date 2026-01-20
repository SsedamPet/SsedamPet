import { Routes, Route } from "react-router-dom";

function HomePage() {
  return <div>Home</div>;
}
function CommunityPage() {
  return <div>Community</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/healthlog" element={<HealthLogPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community" element={<CommunityPage />} />
    </Routes>
  );
}
