import { Button } from "./button";
import { Input } from "./input";

import { TInputProps } from "@/types";

export const ColorInput = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  className = "",
  error,
  touched,
  onClick,
}: TInputProps) => {
  return (
    <div className="relative w-full">
      <Input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full h-[40px] py-1 pl-[0.8rem] md:pl-[1rem] pr-[29px] text-xs md:text-sm border-secondary-gray rounded-[3px] focus:border-[2px] focus:border-primary-blue-light
                      focus-visible:ring-0 ${error && touched ? "border-red-500" : "border-secondary-gray focus:border-primary-blue-light"}
                      ${className} flex-grow`}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-[2px] right-[0.2rem]"
        onClick={onClick}></Button>
    </div>
  );
};
