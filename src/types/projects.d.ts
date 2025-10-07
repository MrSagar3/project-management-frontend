export type TProject = {
  id: number;
  title: string;
  slug: string;
  organization_id: number | undefined;
  description: string;
  color: string;
  status: number;
  deadline: string;
  created_by: number;
  created_at: string;
  updated_at: string;
};

export type TProjectRequest = {
  title: string;
  slug: string;
  organization_id: number | undefined;
  description: string;
  color: string;
  status: number;
  deadline: string;
  created_by: number;
};

export type TProjectResponse = {
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    organization_id: number | undefined;
    description: string;
    color: string;
    status: number;
    deadline: string;
    created_by: number;
    created_at: string;
    updated_at: string;
  };
};
