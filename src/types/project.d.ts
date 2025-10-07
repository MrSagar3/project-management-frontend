export type TProject = {
  message: string;
  data: {
    id: string;
    title: string;
    color: string;
    organization_id: string;
    slug: string;
  }[];
};

export type TprojectState = {
  id: string;
  title: string;
  color: string;
  organization_id: string;
  slug: string;
};

export type TProjectByOrg = {
  id: number;
  title: string;
  slug: string;
  organization_id: number;
  description: string | null;
  color: string | null;
  status: number;
  deadline: object;
  created_by: number;
}[];
