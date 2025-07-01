type Payload = {
  path?: string;
};

export const handleOpenAppLink = (path: string) => {
  const payload = JSON.stringify({ path });

  const encodedPayload = btoa(payload);

  const shareUrl = `${import.meta.env.VITE_APP_URL}?startapp=${encodedPayload}`;

  navigator.clipboard.writeText(shareUrl);
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
