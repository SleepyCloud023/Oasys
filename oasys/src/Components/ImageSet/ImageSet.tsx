import React from 'react';
import { DatasetInfo } from '../../Pages/ListImageSet';

export type ImageSetProps = {
  id: number;
  data: Promise<DatasetInfo>;
};

function ImageSet({ id, data }: ImageSetProps) {
  return (
    <>
      <div>ImageSet</div>
    </>
  );
}

export default ImageSet;
