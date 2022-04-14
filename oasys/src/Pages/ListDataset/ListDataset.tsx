import React, { useEffect, useState } from 'react';
import { Box, css } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from '@mui/system/styled';
import axios from 'axios';

const StyledBox = styled(Box)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.default};
    color: black;
    flex: 1 0 0;
  `,
);

type Permission = {
  userName: string;
  dataset: Array<{ id: number; name: string }>;
};

function ListDataset() {
  const [datasetPermission, setDatasetPermission] = useState<Permission | null>(
    null,
  );
  // const imageSetURL = useLocation().pathname;

  useEffect(() => {
    (async function () {
      const login = await axios.get('api/login');
      const response = await axios.get(
        `/api/dataset_permission/${login.data.id}`,
      );
      setDatasetPermission(response.data);
    })();
  }, []);

  if (datasetPermission === null || datasetPermission.dataset === undefined) {
    // TODO: 에러시 보여줄 페이지 작성
    return null;
  }

  const datasetList = datasetPermission.dataset.map((objects) => (
    <>
      <Link key={`dataset${objects.id}`} to={`/imageSet/${objects.id}`}>
        {objects.name}
      </Link>
      <br />
    </>
  ));

  return (
    <StyledBox>
      <h1>Display list of Dataset Here</h1>
      {datasetList}
    </StyledBox>
  );
}

export default ListDataset;
