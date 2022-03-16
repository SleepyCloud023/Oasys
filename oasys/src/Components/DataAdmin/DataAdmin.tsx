/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { ImageSetProps } from '../ImageSet/ImageSet';
import { ImageSetControllerProps } from '../ImageSetController/ImageSetController';

const serverURL = `http://35.197.111.137:5000`;

// type TargetPages = ImageSetProps | ImageSetControllerProps;
type TargetProps = ImageSetProps;
type DataAdminProps = {
  children: React.ReactElement<TargetProps>[];
  // children: JSX.Element[];
};

function DataAdmin({ children }: DataAdminProps) {
  const my_children = children.map((Component, index) => Component.props);
  return <>{}</>;
}

export default DataAdmin;
