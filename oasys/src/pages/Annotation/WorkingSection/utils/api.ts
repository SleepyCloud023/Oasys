import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  MouseMode,
  WorkState,
  ImageMetaDataResponse,
  Annotation,
} from '../types';

// const serverURL = `http://35.197.111.137:5000`;
// const proxyURL = '';

const errorImageInfo = {
  imageURL: 'img/test_image.jpg',
  imageName: 'File Not Found',
  imageSize: '0 0',
};
const errorAnnotation = {
  box_object_list: [],
  category_list: [],
  tag_list: [],
};
let errorStatusText = 'Cannot Parse Http Status Code';

// http://35.197.111.137:5000/image_info/<id>
export async function getImageInfo(imageID: number): Promise<WorkState> {
  const imageURL = `/api/image_metadata/${imageID}`;
  const mouseMode: MouseMode = 'MOVE';
  const imagePromise = axios
    .get(imageURL)
    .then((response: AxiosResponse) => {
      const { statusText } = response;
      const { annotation, ...imageInfo }: ImageMetaDataResponse = response.data;
      return {
        id: imageID,
        mouseMode,
        statusText,
        ...imageInfo,
        ...annotation,
        selectedBoxList: new Set<number>(),
      };
    })
    .catch((error: AxiosError) => {
      if (axios.isAxiosError(error) && error.response) {
        errorStatusText = error.response.statusText;
      }
      return {
        id: -1,
        mouseMode,
        statusText: errorStatusText,
        ...errorImageInfo,
        ...errorAnnotation,
        selectedBoxList: new Set<number>(),
      };
    });
  return imagePromise;
}

// TODO: Runtime type check
export async function postNewAnnotation(id: number, annotation: Annotation) {
  const imageSetURL = `/api/image_metadata/${id}`;
  const response = await axios.post(imageSetURL, annotation);
  return response;
}
