export type Permission = {
  user: string;
  workspace: Workspace[];
};

export type Workspace = {
  id: number;
  name: string;
  modification_date: string;
};
