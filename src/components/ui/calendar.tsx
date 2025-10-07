import { DayPicker, DayPickerProps } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarProps = DayPickerProps;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col ",
        nav: "flex justify-between items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-6 w-6 bg-transparent p-0 opacity-70 hover:opacity-100",
        ),
        month_caption: "text-center text-lg font-bold",
        ...classNames,
      }}
      {...props}
      onMonthChange={(month) => props.onMonthChange?.(month)}
    />
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
