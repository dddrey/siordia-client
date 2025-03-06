import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import LoadingOverview from "../loading-overview";

const withAdmin = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth = (props: any) => {
    const { data: user, isLoading, isError } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && (isError || !user || !user.isAdmin)) {
        navigate("/error-auth");
      }
    }, [isLoading, isError, user, navigate]);

    if (isLoading) {
      return <LoadingOverview />;
    }

    if (isError || !user || !user.isAdmin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAdmin;
