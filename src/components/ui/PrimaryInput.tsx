import { Eye, EyeClosed } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";

import { TInputProps } from "@/types";

export const PrimaryInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  className = "",
  error,
  touched,
  onClick,
  showPassword,
}: TInputProps) => {
  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        className={`w-full h-[40px] py-1 pl-[0.8rem] md:pl-[1rem] pr-[29px] text-xs md:text-sm rounded-[3px]
          ${error && touched ? "border-red-500" : "border-secondary-gray focus:border-primary-blue-light"}
          ${className}`}
      />
      {type === "password" && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-[2px] right-[0.2rem] "
          onClick={onClick}>
          {" "}
          {showPassword ? <EyeClosed /> : <Eye />}
        </Button>
      )}
    </div>
  );
};
