import React, { useMemo, useReducer } from 'react';
import styled from 'styled-components';
import { CanvasState } from './types/canvasStore';
import reducer from './utils/reducer';
import ImageCanvas from './ImageCanvas';
import { postNewAnnotation, useWorkStore } from '../utils';
import MainViewHandler from './mainViewHandler';
import { Button } from '@mui/material';
import { Annotation } from '../types';
import AlertBox from '../../../../Components/Alert/AlertBox';

type PropsMainViewPanel = { readonly areaPercent?: number };

const StyledMainView = styled.div<PropsMainViewPanel>`
  color: white;
  font: bold;
  font-size: 1.25rem;
  /* 배치 */
  ${({ areaPercent }) => {
    if (!areaPercent) {
    } else {
      return `
        flex: ${areaPercent} 0 0;
      `;
    }
  }}
  flex-flow: column;
  display: flex;
  background-color: #1c1d1f;
`;

const MainViewUtil = styled.div`
  display: flex;
  padding: 0 0.5rem;
  /* 색상 */
  color: white;
  font: bold;
  font-size: 1.25rem;
`;

const MainViewSvg = styled.svg`
  flex: 1 0 0;
`;

const baseImageState: CanvasState = {
  imagePoint: [50, 50],
  imageZoomOut: 1,
  imgDragEvent: {
    originPoint: [50, 50],
    clickPoint: [0, 0],
    on: false,
  },
};

function MainViewCanvas({ areaPercent }: PropsMainViewPanel) {
  const [canvasState, canvasDispatch] = useReducer(reducer, baseImageState);
  const [workState, workDispatch] = useWorkStore();
  const { imageURL, box_object_list } = workState;

  const mainViewHandler = useMemo(
    () => new MainViewHandler(canvasState, canvasDispatch),
    [canvasState],
  );

  const boxList = box_object_list.map((content) => {
    const { id, bounding_box } = content;
    return { id, bounding_box };
  });

  const ZoomButton = ({ type }: { type: 'in' | 'out' }) => (
    <Button
      variant="outlined"
      onClick={() => mainViewHandler.onZoomClick(type)}
    >
      {type === 'in' ? '+' : '-'}
    </Button>
  );

  const ZoomPercent = ({ percent }: { percent: number }) => (
    <div style={{ marginLeft: 7, marginRight: 7 }}>
      {Math.round(percent * 100)}%
    </div>
  );

  const DeleteButton = () => (
    <Button
      sx={{ marginLeft: 'auto', marginRight: '0.5rem' }}
      variant="outlined"
      onClick={() => {
        workDispatch({
          type: 'DELETE_OBJECT',
        });
        workDispatch({
          type: 'UPDATE_SELECTED',
          newSelected: new Set(),
        });
      }}
    >
      Delete Selected Boxes
    </Button>
  );

  async function SaveAnno() {
    const annotation: any = {
      category_list,
      tag_list,
      box_object_list,
    };
    const serverURL = 'http://35.197.111.137:5000';
    const imageSetURL = `${serverURL}/image_info/${workState.id}`;
    const response = await axios.post(imageSetURL, annotation);

    if (response.data.success) {
      setAlert({ open: true, success: true, message: 'Save Success !!' });
    } else {
      setAlert({
        open: true,
        success: false,
        message: 'Save Error : ' + response.data.error_msg,
      });
    }
  }
  const SaveButton = () => (
    <Button
      variant="outlined"
      onClick={() => {
        SaveAnno();
      }}
    >
      Save Annotation
    </Button>
  );

  const AlertBox = () => (
    <Collapse in={alert.open}>
      <Alert
        sx={{ position: 'absolute', top: '70px', mb: 2 }}
        variant="filled"
        severity={alert.success ? 'success' : 'error'}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setAlert({ open: false, success: true, message: '' });
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {alert.message}
      </Alert>
    </Collapse>
  );

  return (
    <StyledMainView areaPercent={areaPercent}>
      <MainViewUtil>
        <ZoomButton type="in" />
        <ZoomPercent percent={canvasState.imageZoomOut} />
        <ZoomButton type="out" />
        <DeleteButton />
      </MainViewUtil>

      <MainViewSvg
        onContextMenu={mainViewHandler.onContextMenu}
        onMouseDown={mainViewHandler.onMouseDown}
        onMouseMove={mainViewHandler.onMouseMove}
        onMouseUp={mainViewHandler.onMouseUp}
        onWheel={mainViewHandler.onWheel}
      >
        <ImageCanvas
          boxes={boxList}
          imageURL={imageURL}
          canvasState={canvasState}
        />
      </MainViewSvg>
    </StyledMainView>
  );
}

export default MainViewCanvas;
