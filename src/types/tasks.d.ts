export type TTasksResponse = {
  id: number;
  title: string;
  description: string;
  project_id: number;
  status: "backlog" | "todo" | "in-progress" | "in-review" | "done";
  due_date: string;
  order: string;
  assigned_by: number;
  assigned_to: number;
  assignee_name?: string;
  project?: {
    id?: number;
    title?: string;
    slug?: string;
    organization_id?: number | undefined;
    description?: string;
    color?: string;
    status?: number;
    deadline?: string;
    created_by?: number;
  };
};

export type TTasks = {
  message: string;
  data: TTasks[];
};

export type TTaskViewResponse = {
  id: number;
  title: string;
  description: string;
  project_id: number;
  status: "backlog" | "todo" | "in-progress" | "in-review" | "done";
  due_date: string;
  order: number;
  assigned_by: number;
  assigned_to: number;
  assigner_name: string;
  assignee_name: string;
};

export type TTaskStoreRequest = {
  title: string;
  description: string | null;
  project_id: number;
  status: string;
  due_date: string;
  order: number;
  assigned_by: number | null;
  assigned_to: number | null;
};
