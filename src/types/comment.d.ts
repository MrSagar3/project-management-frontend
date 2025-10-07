export type TCommentUser = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type TComment = {
  id: number;
  task_id: number;
  user: TCommentUser;
  comment: string;
};

export type TCommentStoreResponse = {
  data: TComment;
};
