import axios, { AxiosError } from "axios";
import { ServerError } from "../types/response";

export const handleError = (error: AxiosError | unknown): ServerError => {
  if (axios.isAxiosError(error)) {
    const response = error.response;

    if (response) {
      if (response.status === 403 && response.data.error.type === "FORBIDDEN") {
        return {
          type: "FORBIDDEN",
          message: "You need to buy a subscription to access this feature.",
          statusCode: response.status,
          details: response.data.error.details || undefined,
          href: "/subscriptions",
        };
      }

      return {
        type: response.data.error.type || "UNKNOWN",
        message: response.data.error.message || "Something went wrong.",
        statusCode: response.status,
        details: response.data.error.details || undefined,
      };
    } else if (error.request) {
      return {
        type: "NETWORK_ERROR",
        message: "Network error: Unable to reach the server.",
        statusCode: 0,
      };
    }
  }

  return {
    type: "UNKNOWN_ERROR",
    message: "An unknown error occurred.",
    statusCode: 0,
  };
};
