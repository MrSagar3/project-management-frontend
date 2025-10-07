import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
interface ErrorData {
  message?: string;
}

export const getErrorMessage = (error: FetchBaseQueryError | any): string => {
  if (error && "message" in error) {
    return error.message;
  }

  if ("data" in error && error.data) {
    return (error.data as ErrorData)?.message || "An unknown error occurred";
  }

  if (error?.status) {
    return `Error: ${error.status}`;
  }
  return "An unknown error occurred";
};
