import { TFormHeadingProps } from "@/types/components";

export const Heading = ({ headingText, className }: TFormHeadingProps) => {
  return (
    <p className={`text-[20px] font-bold text-left mb-[20px] ${className}`}>
      {headingText}
    </p>
  );
};
