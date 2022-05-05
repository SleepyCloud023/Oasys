import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Permission } from './types/list-workspace';
import WorkspaceCard from './WorkspaceCard';
import { StringDecoder } from 'string_decoder';

type WorkspacesProps = {
  userId: string;
  permission: Permission;
  setPermission: React.Dispatch<React.SetStateAction<Permission | null>>;
};

const StyledDatasetsPanel = styled(Box)`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledDatasets = styled(Box)`
  padding: 20pt;
`;

function Workspaces({ userId, permission, setPermission }: WorkspacesProps) {
  const { workspace } = permission;
  const cardElements = workspace.map((objects, index) => (
    <Grid item xs={4} sm={3} md={3} lg={2} key={`datasetCard${index}`}>
      <WorkspaceCard
        userId={userId}
        workspaceInfo={objects}
        setPermission={setPermission}
      />
    </Grid>
  ));

  return (
    <StyledDatasetsPanel>
      <StyledDatasets>
        <Grid container spacing={2}>
          {cardElements}
        </Grid>
      </StyledDatasets>
    </StyledDatasetsPanel>
  );
}

export default Workspaces;
