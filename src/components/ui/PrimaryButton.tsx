import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TPrimaryButtonProps } from "@/types";

export function PrimaryButton({
  children,
  className,
  ...props
}: TPrimaryButtonProps) {
  return (
    <Button
      className={cn(
        "w-full bg-secondary-gray text-white font-semibold py-2 rounded-md text-sm md:text-md hover:bg-secondary-gray-light",
        className,
      )}
      {...props}>
      {children}
    </Button>
  );
}
