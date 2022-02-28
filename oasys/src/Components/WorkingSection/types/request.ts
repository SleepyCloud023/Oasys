import { Annotation, ImageInfo } from './workStore';
export type ImageMetaDataResponse = {
  annotation: Annotation;
} & ImageInfo;
