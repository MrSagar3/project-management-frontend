import { Label } from "./label";

import { TPrimaryLabelProps } from "@/types/components";

export const PrimaryLabel = ({
  id,
  className,
  labelText,
}: TPrimaryLabelProps) => {
  return (
    <Label
      htmlFor={id}
      className={`font-medium text-[13px] h-[20px] ${className}`}>
      {labelText}
    </Label>
  );
};
