import React from 'react';
import { DatasetInfo } from '../../Pages/ListImage';

export type ImageSetControllerProps = {
  id: number;
  data: DatasetInfo;
};

function ImageSetController({ id, data }: ImageSetControllerProps) {
  return (
    <>
      <div>ImageSetController</div>
    </>
  );
}

export default ImageSetController;
