import dayjs from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DatePickerProps } from "@/types/components";
import "react-day-picker/style.css";
export const DatePicker = ({
  className,
  value,
  onChange,
  label,
  placeholder = "Pick a date",
  dateFormat = "DD/MM/YYYY",
  error = false,
  touched = false,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(value ?? new Date());

  useEffect(() => {
    if (!value) return;
    setDate(value);
  }, [value]);

  const handleSelect = (day: Date | undefined) => {
    if (day) {
      setDate(day);
      onChange?.(day);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={`${cn(
            "w-full justify-between border-black text-left font-normal bg-white h-[40px]",
            !date && "text-muted-foreground",
            error && touched && "border-red-500",
          )} ${className}`}>
          <span>
            {date ? dayjs(date).format(dateFormat) : label || placeholder}
          </span>
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 " align="end">
        <div className="bg-white text-black">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(day) => {
              const today = dayjs().startOf("day");
              return dayjs(day).isBefore(today);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
