import { CSSProperties } from "react";
import toast from "react-hot-toast";

export const showToast = ({
  type,
  message,
  duration = 2000,
}: {
  type?: "success" | "error";
  message: string;
  duration?: number;
}) => {
  const commonStyle: CSSProperties = {
    textAlign: "center",
    fontSize: "16px",
  };

  type === "success"
    ? toast.success(message, { duration, style: commonStyle })
    : toast.error(message, { duration, style: commonStyle });
};
