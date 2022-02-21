import axios, { AxiosError, AxiosResponse } from 'axios';
import { MouseMode, WorkState } from '../types';

const serverURL = `http://35.197.111.137:5000`;
// const proxyURL = '';
const imageURL404 = 'img/test_image.jpg';

function getImageInfo(imageID: number): Promise<WorkState> {
  const imageURL = `${serverURL}/image_info/${imageID}`;
  const mouseMode: MouseMode = 'MOVE';
  const imagePromise = axios
    .get(imageURL)
    .then((response: AxiosResponse) => {
      const { statusText } = response;
      const { imageURL, imageName, imageSize, annotation } = response.data;
      const { categories, tag_list, box_object_list } = annotation;
      const objectListLength = categories.length;
      return {
        mouseMode,
        statusText,
        imageURL,
        imageName,
        imageSize,
        objectListLength,
        box_object_list,
        categories,
        tag_list,
      };
    })
    .catch((error: AxiosError) => {
      let statusError = 'Cannot Parse Http Status Code';
      if (axios.isAxiosError(error) && error.response) {
        statusError = error.response.statusText;
      }
      return {
        mouseMode,
        statusText: statusError,
        imageURL: imageURL404,
        imageName: 'File Not Found',
        imageSize: '',
        objectListLength: 0,
        box_object_list: [],
        categories: [],
        tag_list: [],
      };
    });
  return imagePromise;
}

export function dummyFetchFileInfo() {
  // http://35.197.111.137:5000/image_info/<id>
  return getImageInfo(2);
}
