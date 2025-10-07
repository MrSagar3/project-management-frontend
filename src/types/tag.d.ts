export type TTag = {
  id?: number;
  label: string;
  className?: string;
  text?: string;
};

export type TTagStoreResponse = {
  label: any;
  id: any;
  message: string;
  data: {
    id: number;
    label: string;
  };
};
