/** @jsxImportSource @emotion/react */
import { Button, css, Divider, styled } from '@mui/material';
import { Workspace } from './types/list-dataset';

type DatasetsControllerProps = {
  workspaceId: number;
  workspace: Workspace;
};

const workspaceUrl = '/api/workspace';

const buttonStyle = css`
  margin-left: 6px;
  background: teal;
  color: white;
`;

const dividerStyle = css`
  align-self: stretch;
  margin: 0.5rem 10px;
`;

const StyledButton = styled(Button)`
  margin-left: 6px;
  background: teal;
  color: white;
`;
const StyledDivider = styled(Divider)`
  align-self: stretch;
  margin: 0.5rem 10px;
`;

function DatasetsController({
  workspaceId,
  workspace,
}: DatasetsControllerProps) {
  return (
    <>
      <h2>ImageSetController</h2>
      <Button variant="contained" css={buttonStyle}>
        Create Dataset
      </Button>
      <Divider css={dividerStyle} />
    </>
  );
}

export default DatasetsController;
