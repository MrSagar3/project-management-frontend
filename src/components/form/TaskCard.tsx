import { Draggable } from "@hello-pangea/dnd";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { useState } from "react";

import TaskForm from "./TaskForm";
import { PrimaryDialog } from "../ui/PrimaryDialog";
const TaskCard = ({ task, index }: { task?: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PrimaryDialog
        trigger={
          <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={() => {
                  setIsOpen(true);
                }}
                className="bg-foreground py-2 px-4 rounded-sm mb-2 border-2 border-gray-200 cursor-pointer">
                <p className="font-semibold text-gray-700 break-words">
                  {task.title}
                </p>
                <hr className="my-2 border-gray-300" />
                <div className="flex items-center">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: task.project?.color || "black",
                    }}></div>
                  <p className="text-xs text-gray-600 ml-2">
                    {task.project?.title || task.project_id}
                  </p>
                </div>
                <div className="flex items-center mt-3">
                  <Avatar className="w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {task.assignee_name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="ml-2 text-xs">
                    {format(new Date(task.due_date), "MMM do, yyyy")}
                  </p>
                </div>
              </div>
            )}
          </Draggable>
        }
        content={
          <TaskForm id={task.id} status={task.status} setOpen={setIsOpen} />
        }
        isDialogOpen={isOpen}
        setIsDialogOpen={setIsOpen}
        contentClassName="bg-white max-h-[90vh] overflow-auto"
        hasMinWidth="min-w-[550px]"
        className="min-w-[550px] p-2 "
      />
    </>
  );
};
export default TaskCard;
