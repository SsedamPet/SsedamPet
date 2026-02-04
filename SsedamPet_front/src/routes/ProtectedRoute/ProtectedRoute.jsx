import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../../react-query/queries/usersQueries";
import Loading from "../../components/common/Loading";

export default function ProtectedRoute() {
  const token = localStorage.getItem("AccessToken");

  if (!token || token === "null") {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
  

}
