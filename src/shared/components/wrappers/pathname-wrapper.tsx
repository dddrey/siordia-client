import { useEffect } from "react";
import { decodePayload, parseInitData } from "@/shared/utils/uri-links";
import { useNavigate } from "react-router-dom";

export const usePathnameParams = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const parsedData = parseInitData(window.Telegram.WebApp.initData);
    const startParam = parsedData.start_param;
    const sessionId = parsedData.auth_date;
    if (!startParam || !sessionId) return;

    const storageKey = `start_param_used_${sessionId}`;
    const hasUsed = false;
    if (!hasUsed) {
      const decoded = decodePayload(startParam);
      if (decoded?.path) {
        localStorage.setItem(storageKey, "1");
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("start_param_used_") && key !== storageKey) {
            localStorage.removeItem(key);
          }
        });
        console.log(decoded.path);
        navigate(`/${decoded.path}`);
      }
    }
  }, []);
};
