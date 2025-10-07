import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";

import Invitation from "./Invitation";
import { PrimaryDialog } from "../ui/PrimaryDialog";

const Invite = () => {
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
        header="Add member"
        contentClassName="bg-white overflow-auto px-[30px] py-[20px]"
        hasMaxWidth="80px"
        hasMinWidth="100px"
        content={<Invitation setOpen={setIsDialogOpen} />}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
};

export default Invite;
