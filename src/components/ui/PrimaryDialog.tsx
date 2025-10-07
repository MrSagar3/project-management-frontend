import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TPrimaryDialogProps } from "@/types/components";

export const PrimaryDialog = ({
  trigger,
  content,
  contentClassName = "",
  header,
  description,
  setIsDialogOpen,
  isDialogOpen,
  setOpen,
  hasMinWidth = "min-w-[500px]",
  hasMaxWidth = "max-w-[70%]",
  className,
}: TPrimaryDialogProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {trigger && (
        <DialogTrigger asChild onClick={() => setOpen?.(true)}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogOverlay className="bg-transparent" />
      <DialogContent
        className={`sm:max-w-[65%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] font-primary  outline-none w-full ${contentClassName} ${hasMinWidth} ${hasMaxWidth} ${className}`}
        onOpenAutoFocus={(e) => e.preventDefault()}
        aria-describedby="">
        {header && (
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold font-primary">
              {header}
            </DialogTitle>
          </DialogHeader>
        )}
        {description && (
          <p className="text-sm text-secondary-gray">{description}</p>
        )}
        {content}
      </DialogContent>
    </Dialog>
  );
};
