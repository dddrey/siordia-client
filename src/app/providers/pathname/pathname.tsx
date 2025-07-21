import { useEffect, useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  getDecodedPathFromInitData,
  CURRENT_PATH_KEY,
  handleOpenAppLink,
} from "@/shared/utils/uri-links";

export const PathnameProvider = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navigatedRef = useRef(false);

  useEffect(() => {
    const currentPath = location.pathname === "/" ? "" : location.pathname;
    sessionStorage.setItem(CURRENT_PATH_KEY, currentPath);
  }, [location.pathname]);

  useEffect(() => {
    if (navigatedRef.current) return;
    console.log(handleOpenAppLink(location.pathname));
    const path = getDecodedPathFromInitData();
    if (path) {
      navigatedRef.current = true;
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      navigate(`/${cleanPath}`, { replace: true });
    }
  }, [navigate]);

  return <Outlet />;
};
