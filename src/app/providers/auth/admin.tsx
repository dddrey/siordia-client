import LoadingOverview from "@/shared/components/loading-overview";
import { useUser } from "@/shared/hooks/use-user";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoutes = () => {
  const { isLoading, error, data: user } = useUser();

  if (isLoading && !user) return <LoadingOverview />;
  if (error) return <Navigate to={"/error-auth"} replace />;

  if (user && !user?.isAdmin) return <Navigate to={"/error-auth"} replace />;

  return <Outlet />;
};

export default AdminProtectedRoutes;
