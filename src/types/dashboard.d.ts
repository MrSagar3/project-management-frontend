export type TOranizationTasks = {
  total_tasks: number;
  assigned_tasks_count: number;
  completed_tasks_count: number;
  overdue_tasks_count: number;
  inCompleted_tasks_count: number;
};

export type TTaskSection = {
  tasksData: TOranizationTasks[];
};

export type TOrganizationMembers = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type TMembers = {
  message: string;
  data: TOrganizationMembers[];
};

export type TProject = {
  id: number;
  title: string;
  color: string;
};

export type TProjectSectionProps = {
  organizationProjects: TProject[];
};

export type PieChartDataItem = {
  name: string;
  value: number;
  fill: string;
};

export type TaskStatus =
  | "todo"
  | "in-review"
  | "done"
  | "backlog"
  | "in-progress";
