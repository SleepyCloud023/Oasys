/** @jsxImportSource @emotion/react */
import * as React from 'react';

type DataAdminProps = {
  children: React.ReactElement[];
  // children: JSX.Element[];
};

function DataAdmin({ children }: DataAdminProps) {
  const my_children = children.map((Component, index) => Component.props);
  return <>{}</>;
}

export default DataAdmin;
