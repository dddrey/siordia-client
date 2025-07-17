import { toast } from "react-hot-toast";

type Payload = {
  path?: string;
};

export const handleOpenAppLink = (path: string) => {
  const payload = JSON.stringify({ path });

  const encodedPayload = btoa(payload);
  const shareUrl = `${import.meta.env.VITE_APP_URL}?startapp=${encodedPayload}`;
  console.log(shareUrl);

  navigator.clipboard
    .writeText(shareUrl)
    .then(() => {
      toast.success("Ссылка скопирована в буфер обмена");
    })
    .catch((error) => {
      console.error("❌ Failed to copy to clipboard:", error);
    });
};

export const decodePayload = (encoded: string): Payload => {
  const decodedString = atob(encoded);
  const decodedObject = JSON.parse(decodedString);

  return decodedObject;
};

interface InitDataObject {
  [key: string]: string | null;
}

export const parseInitData = (initData: string): InitDataObject => {
  const params = new URLSearchParams(initData);
  const result: InitDataObject = {};

  for (const [key, value] of params.entries()) {
    result[key] = value;
  }

  return result;
};

export const CURRENT_PATH_KEY = "current_path";
const STARTAPP_PROCESSED_KEY = "startapp_processed";

export const getDecodedPathFromInitData = (): string | null => {
  try {
    const initData = window.Telegram?.WebApp?.initData;
    if (!initData) {
      const currentPath = sessionStorage.getItem(CURRENT_PATH_KEY);
      if (currentPath) {
        return currentPath;
      }
      return null;
    }

    const parsedData = parseInitData(initData);
    let { start_param } = parsedData;

    if (!start_param) {
      const urlParams = new URLSearchParams(window.location.search);
      start_param =
        urlParams.get("startapp") || urlParams.get("tgWebAppStartParam");
    }

    if (!start_param && window.Telegram?.WebApp?.initDataUnsafe) {
      start_param = window.Telegram.WebApp.initDataUnsafe.start_param || null;
    }

    const startappProcessed = sessionStorage.getItem(STARTAPP_PROCESSED_KEY);

    if (!start_param || startappProcessed) {
      const currentPath = sessionStorage.getItem(CURRENT_PATH_KEY);
      if (currentPath) {
        return currentPath;
      }
      return null;
    }

    const decoded = decodePayload(start_param);
    if (!decoded?.path) {
      return null;
    }

    sessionStorage.setItem(STARTAPP_PROCESSED_KEY, "true");

    return decoded.path;
  } catch (error) {
    console.error("Failed to extract path from initData:", error);
    const currentPath = sessionStorage.getItem(CURRENT_PATH_KEY);
    if (currentPath) {
      return currentPath;
    }
    return null;
  }
};
