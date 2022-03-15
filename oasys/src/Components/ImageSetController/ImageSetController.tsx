import React from 'react';
import { DatasetInfo } from '../../Pages/ListImageSet';
import Link from '../CustomElement/Link';

export type ImageSetControllerProps = {
  id: number;
  data: Promise<DatasetInfo>;
};

function ImageSetController({ id }: ImageSetControllerProps) {
  return (
    <>
      <Link to={`/annotation/${id}`}>image_1</Link>
    </>
  );
}

export default ImageSetController;
