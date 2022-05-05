import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Workspace, Dataset } from './types/list-dataset';
import DatasetCard from './DatasetCard';

type DatasetsProps = {
  workspaceId: number;
  workspace: Workspace;
  setWorkspace: React.Dispatch<React.SetStateAction<Workspace | null>>;
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

function Datasets({ workspaceId, workspace, setWorkspace }: DatasetsProps) {
  const { dataset } = workspace;
  const cardElements = dataset.map((objects, index) => (
    <Grid item xs={4} sm={3} md={3} lg={2} key={`datasetCard${index}`}>
      <DatasetCard
        workspaceId={workspaceId}
        datasetInfo={objects}
        setWorkspace={setWorkspace}
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

export default Datasets;
