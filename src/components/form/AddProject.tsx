import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

import ProjectForm from "./ProjectForm";

import { PrimaryDialog } from "@/components/ui/PrimaryDialog";

const AddProject = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <PrimaryDialog
        trigger={
          <PlusCircleIcon
            size={18}
            className="text-gray-700 hover:text-black cursor-pointer"
          />
        }
        contentClassName="bg-white max-h-[90vh] overflow-auto px-[30px] py-[20px]"
        content={<ProjectForm setOpen={setIsDialogOpen} />}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default AddProject;
