export type Workspace = {
  workspace: string;
  dataset: Dataset[];
};

export type Dataset = {
  id: number;
  name: string;
  modification_date: string;
};
