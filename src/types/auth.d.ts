export type TAuthUser = {
  email: string;
  name: string;
};

export type TResponse = {
  message: string;
};

export type TUserData = {
  email: string;
  name: string;
  password: string;
};

export type TPasswordData = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type TForgetData = {
  email: string;
};

export type TUser = {
  id: string;
  email: string;
  name: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
};

export type TLogoutProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
};
