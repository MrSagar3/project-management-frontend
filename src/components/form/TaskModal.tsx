import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

import TaskForm from "./TaskForm";

import { PrimaryDialog } from "@/components";

export const TaskModal = ({ status }: { status: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <PrimaryDialog
      trigger={
        <PlusCircleIcon
          size={18}
          className="text-gray-700 hover:text-black cursor-pointer"
        />
      }
      contentClassName="bg-white max-h-[90vh] overflow-auto  "
      className="min-w-[550px] p-2 "
      content={<TaskForm status={status} setOpen={setIsDialogOpen} />}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
    />
  );
};
