import { TaskStatus } from "@/types/dashboard";

export const LOGO_NAME = "VISION BOARD";
export const LOGO_CLASSNAME =
  "text-center text-xl md:text-2xl lg:text-3xl font-black tracking-wide text-primary-blue";

export const TASKS_NAME_MAP: Record<string, string> = {
  total_tasks: "Total Tasks",
  assigned_tasks_count: "Assigned Tasks",
  completed_tasks_count: "Completed Tasks",
  overdue_tasks_count: "Overdue Tasks",
  inComplete_tasks_count: "Incomplete Tasks",
};

export const STATUS_TO_NAME_MAP: Record<TaskStatus, string> = {
  todo: "Todo",
  "in-review": "In review",
  done: "Done",
  backlog: "Backlog",
  "in-progress": "In progress",
};
