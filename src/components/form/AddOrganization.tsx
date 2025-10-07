import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

import { OrganisationForm } from "./OrganisationForm";

import { PrimaryDialog } from "@/components";

export const AddOrganization = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <PrimaryDialog
      trigger={
        <PlusCircleIcon
          size={18}
          className="text-gray-700 hover:text-black cursor-pointer"
        />
      }
      contentClassName="bg-white max-h-[90vh] overflow-auto px-[30px] py-[20px]"
      content={<OrganisationForm setOpen={setIsDialogOpen} />}
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
    />
  );
};
