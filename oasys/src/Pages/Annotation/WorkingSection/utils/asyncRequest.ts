import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  MouseMode,
  WorkState,
  ImageMetaDataResponse,
  Annotation,
} from '../types';

const serverURL = `http://35.197.111.137:5000`;
// const proxyURL = '';
const errorImageInfo = {
  imageURL: 'img/test_image.jpg',
  imageName: 'File Not Found',
  imageSize: '',
};
const errorAnnotation = {
  box_object_list: [],
  category_list: [],
  tag_list: [],
};
let errorStatusText = 'Cannot Parse Http Status Code';

// http://35.197.111.137:5000/image_info/<id>
export async function getImageInfo(imageID: number): Promise<WorkState> {
  const imageURL = `${serverURL}/image_info/${imageID}`;
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

export async function postNewAnnotation(id: number, annotation: Annotation) {
  const imageSetURL = `${serverURL}/image_info/${id}`;
  const response = await axios.post(imageSetURL, annotation);
  return response;
}
