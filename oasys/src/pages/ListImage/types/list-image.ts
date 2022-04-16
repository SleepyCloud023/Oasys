export type DatasetInfo = {
  datasetName: string;
  image_metadata: ImageMetaData[];
};

export type ImageMetaData = {
  id: number;
  imageName: string;
  imageSize: string;
  imageURL: string;
};
