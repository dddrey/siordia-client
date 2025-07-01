import { Navigate, Outlet } from "react-router-dom";
import LoadingOverview from "@/shared/components/loading-overview";
import { useUser } from "@/shared/hooks/use-user";

const ClientProtectedRoutes = () => {
  const { isLoading, error, data: user } = useUser();

  if (isLoading && !user) return <LoadingOverview />;
  if (error) return <Navigate to={"/error-auth"} replace />;

  if (user && !user?.registrationDate) return <Navigate to={"/auth"} />;

  return <Outlet />;
};

export default ClientProtectedRoutes;
