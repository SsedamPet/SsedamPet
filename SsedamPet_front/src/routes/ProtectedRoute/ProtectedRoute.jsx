import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../../react-query/queries/usersQueries";
import Loading from "../../components/common/Loading";

export default function ProtectedRoute() {
  const { data, isLoading, isError } = useMeQuery();

  if (isLoading) return <Loading />;

  if (!data || isError) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}