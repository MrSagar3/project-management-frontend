import { Textarea } from "@/components/ui/textarea";
import { TPrimaryTextareaProps } from "@/types/components";

export const PrimaryTextArea = ({
  placeholder,
  id,
  name,
  onChange,
  onBlur,
  className,
  value,
  error,
  touched,
}: TPrimaryTextareaProps) => {
  return (
    <Textarea
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      className={`h-[80px] border border-gray-200  rounded-[3px] text-xs
                    focus-visible:ring-0 ${
                      error && touched
                        ? "border-red-500"
                        : " border-secondary-gray"
                    } ${className}`}
      value={value}
    />
  );
};
