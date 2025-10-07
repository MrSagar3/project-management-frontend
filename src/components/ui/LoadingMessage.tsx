import { TLoadingMessageProps } from "@/types/components";

export const LoadingMessage = ({ message }: TLoadingMessageProps) => {
  return <p className="text-gray-600 text-sm">{message}</p>;
};
