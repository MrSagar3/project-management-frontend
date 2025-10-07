import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectComponentProps } from "@/types/components";

export const PrimarySelect = ({
  id,
  options,
  value,
  onChange,
  placeholder = "Select one",
  className,
  error,
  touched,
  icon,
}: SelectComponentProps) => {
  return (
    <div>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          id={id}
          className={`w-full h-[40px] py-1 pl-[0.8rem] md:pl-[1rem]  text-xs md:text-sm rounded-[3px]
            ${error && touched ? "border-red-500" : "border-secondary-gray focus:border-primary-blue-light"}
            ${className}`}>
          {icon && <span className="mr-2">{icon}</span>}
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="bg-white hover:bg-gray-100 text-black font-primary">
              <span>{option.icon}</span>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
