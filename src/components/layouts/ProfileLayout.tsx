import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { ChevronsUpDown, LogOut, User2Icon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PrimaryDialog } from "../ui/PrimaryDialog";

import { AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout } from "@/pages";
import { RootState } from "@/store";

export default function ProfileLayout() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleProfileClick = () => {
    navigate("/user-profile");
  };

  return (
    <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-2 p-2 bg-muted rounded-lg hover:bg-accent w-60 md:max-w-100 lg:max-w-1/3 pr-5 xl:w-80 ">
          <Avatar className="w-8 h-8 text-white bg-[#9F9F9F] rounded-full flex justify-center items-center">
            <AvatarImage
              className="rounded-full bg-contain"
              src={user?.logo}
              alt={user?.name}
            />
            <AvatarFallback className="text-[14px]">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-gray-700">
              {user.name}
            </span>
            <span className="truncate text-xs text-gray-500">{user.email}</span>
          </div>
          <ChevronsUpDown className="w-5 h-5 text-muted-foreground " />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 rounded-lg bg-popover bg-white  mb-3 font-primary"
          side="right"
          align="start"
          sideOffset={-8}>
          <DropdownMenuItem
            onClick={handleProfileClick}
            className="cursor-pointer hover:bg-gray-100">
            <User2Icon className="mr-2 h-4 w-4" />
            User Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="cursor-pointer y hover:bg-gray-100">
            <LogOut className="mr-2 h-4 w-4 " />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isDialogOpen && (
        <div className="fixed inset-0 flex justify-center items-center ">
          <div className="bg-white p-6 rounded-lg">
            <PrimaryDialog
              hasMinWidth="min-w-[80px]"
              hasMaxWidth="max-w-[100px]"
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              content={
                <Logout
                  isDialogOpen={isDialogOpen}
                  setIsDialogOpen={setIsDialogOpen}
                />
              }
              header="Logout"
              description="Are you sure you want to log out?"
              contentClassName="h-auto "
            />
          </div>
        </div>
      )}
    </div>
  );
}
