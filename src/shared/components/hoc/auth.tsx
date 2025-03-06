import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import LoadingOverview from "../loading-overview";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const ComponentWithAuth = (props: any) => {
    const { data: user, isLoading, isError } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && (isError || !user)) {
        navigate("/error-auth");
      }
    }, [isLoading, isError, user, navigate]);

    if (isLoading) {
      return <LoadingOverview />;
    }

    if (isError || !user) {
      return null; // Возвращаем null, пока происходит перенаправление.
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
