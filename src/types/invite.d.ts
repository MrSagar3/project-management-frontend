export type TInvite = {
  email: string;
  organization_id: number | undefined;
  role: string;
};

export type TInviteResponse = {
  message: string;
};

export type TInviteRequest = {
  email: string;
  organization_id: number | undefined;
  role: string;
};
