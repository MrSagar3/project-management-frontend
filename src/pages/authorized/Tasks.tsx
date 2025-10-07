import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { format } from "date-fns";
import { Folder, ListChecks, UserRoundCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext, useSearchParams } from "react-router-dom";

import { Header, PrimarySelect, DatePicker } from "@/components";
import TaskCard from "@/components/form/TaskCard";
import { TaskModal } from "@/components/form/TaskModal";
import {
  useGetTasksQuery,
  useUpdateTasksMutation,
} from "@/services/endpoints/tasksEndpoints";
import { RootState } from "@/store";
import { TAppContextType } from "@/types";
import { columns } from "@/utils/taskmenu";

const Tasks = () => {
  const organizationId = useSelector(
    (state: RootState) => state.organizations?.selectedOrganization?.id,
  );
  const { setLoading } = useOutletContext<TAppContextType>();
  const [searchParams, setSearchParams] = useSearchParams();

  if (organizationId) {
    searchParams.set("org", String(organizationId));
  }
  const status = searchParams.get("status") || "all";
  const assignee = searchParams.get("assignee") || "all";
  const project = searchParams.get("project") || "all";
  const duedate = searchParams.get("due_date") || "all";

  const organizationName = useSelector(
    (state: RootState) => state.organizations?.selectedOrganization?.name,
  );

  const { data, isLoading: isLoadingTasks } = useGetTasksQuery(organizationId, {
    skip: !organizationId,
  });
  const [updateTask] = useUpdateTasksMutation();
  const [localTasks, setLocalTasks] = useState(data || []);

  useEffect(() => {
    if (data) setLocalTasks(data);
  }, [data]);

  useEffect(() => {
    if (!isLoadingTasks) {
      setLoading(false);
    }
  }, [isLoadingTasks]);

  const tasks = data || [];

  const filteredTasks = localTasks.filter((task) => {
    const matchesStatus = status === "all" || task.status === status;
    const matchesAssignee =
      assignee === "all" || String(task.assignee_name) === assignee;
    const matchesProject =
      project === "all" ||
      String(task.project?.title || task.project_id) === project;
    const matchesDueDate =
      duedate === "all" || new Date(task.due_date) >= new Date(duedate);
    const orgid = organizationId;
    return (
      orgid &&
      matchesStatus &&
      matchesAssignee &&
      matchesProject &&
      matchesDueDate
    );
  });

  const handleStatusChange = (value: string) => {
    setSearchParams({
      org: String(organizationId),
      status: value,
      assignee,
      project,
      due_date: duedate,
    });
  };

  const handleAssigneeChange = (value: string) => {
    setSearchParams({
      org: String(organizationId),
      status,
      assignee: value,
      project,
      due_date: duedate,
    });
  };

  const handleProjectChange = (value: string) => {
    setSearchParams({
      org: String(organizationId),
      status,
      assignee,
      project: value,
      due_date: duedate,
    });
  };

  const handleDueDateChange = (date: string) => {
    setSearchParams({
      org: String(organizationId),
      status,
      assignee,
      project,
      due_date: date,
    });
  };
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const newStatus = destination.droppableId;

    if (
      source.droppableId !== newStatus ||
      source.index !== destination.index
    ) {
      const taskIndex = localTasks.findIndex(
        (t) => String(t.id) === draggableId,
      );
      if (taskIndex === -1) return;

      const updatedTasks = [...localTasks];

      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        status: newStatus,
        order: destination.index + 1,
      };

      setLocalTasks(updatedTasks);

      try {
        await updateTask({
          id: updatedTasks[taskIndex].id,
          title: updatedTasks[taskIndex].title,
          description: updatedTasks[taskIndex].description,
          project_id: updatedTasks[taskIndex].project_id,
          status: newStatus,
          due_date: updatedTasks[taskIndex].due_date,
          order: destination.index + 1,
          assigned_to: updatedTasks[taskIndex].assigned_to,
        });
      } catch (error) {
        console.error("Error updating task:", error);
        setLocalTasks(localTasks);
      }
    }
  };

  return (
    <>
      <Header
        title={organizationName}
        description="View all of your tasks here"
      />
      <div className="min-h-screen w-full border bg-foreground border-gray-200 rounded-sm shadow-lg p-5">
        <p className="font-semibold text-gray-800 border-b border-gray-300 pb-3">
          Kanban
        </p>
        <div className="flex flex-wrap md:flex-row mt-4 mb-4 gap-2">
          <PrimarySelect
            id="select-status"
            icon={<ListChecks height={16} width={16} className="" />}
            options={[
              { value: "all", label: "All statuses" },
              ...Array.from(
                new Set(columns.map((column) => column.status)),
              ).map((status) => ({
                value: status,
                label:
                  columns.find((column) => column.status === status)?.label ||
                  status,
              })),
            ]}
            value={status}
            onChange={handleStatusChange}
            placeholder="Select Status"
            className="w-[165px] border-secondary-white "
          />

          <PrimarySelect
            id="select-assignee"
            icon={<UserRoundCheck height={16} width={16} />}
            options={[
              { value: "all", label: "All Assignees" },
              ...Array.from(
                new Set(tasks.map((task) => task.assignee_name)),
              ).map((assignee) => ({
                value: String(assignee),
                label: String(assignee),
              })),
            ]}
            value={assignee}
            onChange={handleAssigneeChange}
            placeholder="Select Assignee"
            className="w-[165px] border-secondary-white "
          />
          <PrimarySelect
            id="select-project"
            icon={<Folder height={16} width={16} className="mr-2" />}
            options={[
              { value: "all", label: "All Projects" },
              ...Array.from(
                new Set(
                  tasks.map((task) => task.project?.title || task.project_id),
                ),
              ).map((projectId) => ({
                value: String(projectId),
                label: (
                  <span
                    className="truncate block max-w-[150px]"
                    title={String(projectId)}>
                    {String(projectId)}
                  </span>
                ),
              })),
            ]}
            value={project}
            onChange={handleProjectChange}
            placeholder="Select Project"
            className="w-[165px] border-secondary-white "
          />

          <DatePicker
            className=" w-[165px] border-secondary-white h-[40px]   "
            label="Due Date"
            onChange={(date) => handleDueDateChange(format(date, "yyyy-MM-dd"))}
          />
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 text-sm">
            {columns.map(({ label, status: columnStatus, icon }) => {
              const columnTasks = filteredTasks.filter(
                (task) => task.status === columnStatus,
              );

              return (
                <div className="flex flex-col mb-4">
                  <div className="flex items-center mb-4">
                    {icon}
                    <p className="font-semibold text-gray-800 ml-2">
                      {label} - {columnTasks.length}
                    </p>
                    <div className="ml-auto">
                      <TaskModal status={columnStatus} />
                    </div>
                  </div>

                  <Droppable key={columnStatus} droppableId={columnStatus}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="bg-background px-2 py-2 border border-gray-200 rounded-md min-h-screen">
                        {columnTasks
                          .slice()
                          .sort((a, b) => Number(a.order) - Number(b.order))
                          .map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} />
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default Tasks;
