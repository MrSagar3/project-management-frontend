export type TOrganizationStoreRequest = {
  name: string;
  address: string;
  email: string;
  phone: string;
  logo: File;
  status: number;
};

export type TOrganizationStoreResponse = {
  message: string;
  data: {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    logo: File;
    status: number;
    role: string;
    project_count: string;
  };
};

export type TOrganization = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  logo: string;
  status: number;
  role: string;
  projects_count: string;
};
