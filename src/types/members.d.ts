export type TMember = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type TMemberResponse = {
  message: string;
  data: TMember[];
};

export type TMemberRequest = {
  id: number;
  name: string;
  email: string;
  role: string;
};
export type TMemberByOrganization = {
  id: number;
  name: string;
  email: string;
  role: string;
}[];
