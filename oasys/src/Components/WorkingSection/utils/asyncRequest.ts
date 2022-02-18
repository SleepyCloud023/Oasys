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
      const { ObjectList, ClassList, TagList } = annotation;
      const objectListLength = ObjectList.length;
      return {
        mouseMode,
        statusText,
        imageURL,
        imageName,
        imageSize,
        objectListLength,
        objectList: ObjectList,
        classList: ClassList,
        tagList: TagList,
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
        objectList: [],
        classList: [],
        tagList: [],
      };
    });
  return imagePromise;
}

export function dummyFetchFileInfo() {
  // http://35.197.111.137:5000/image_info/<id>
  return getImageInfo(2);
}
