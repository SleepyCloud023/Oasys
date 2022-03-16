/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { ListImageSet } from '../../Pages';
import ImageSet from '../ImageSet/ImageSet';
import ImageSetController from '../ImageSetController/ImageSetController';

const serverURL = `http://35.197.111.137:5000`;

type TargetElements = typeof ImageSet | typeof ImageSetController;
type DataAdminProps<T extends TargetElements> = {
  children: Array<T>;
};

function DataAdmin<T extends TargetElements>({ children }: DataAdminProps<T>) {
  return <>{children.map((Child, idx) => 1)}</>;
}

export default DataAdmin;
