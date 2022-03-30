import _ from 'lodash';
import { ACTION } from '../../types';
import { BoundingBox } from '../../types';

type ParamImageCanvasRef = {
  imageCanvas: React.RefObject<SVGSVGElement>;
  cPointRef: React.MutableRefObject<(SVGCircleElement | null)[]>;
  cPointState: React.MutableRefObject<number>;
  cPoint: React.MutableRefObject<BoundingBox>;
};

export const polygonModeClick = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  imageCanvasRef: ParamImageCanvasRef,
  imageZoomOut: number,
  nextId: number,
  workDispatch: React.Dispatch<ACTION>,
) => {
  const { imageCanvas, cPointRef, cPointState, cPoint } = imageCanvasRef;
  const cNum = cPointState.current;

  if (cNum === 3) {
    for (const cPointElement of cPointRef.current) {
      if (cPointElement == null) {
        continue;
      }
      cPointElement.setAttribute('r', '0');
    }

    if (imageCanvas.current == null) {
      return;
    }
    const offsetX =
      (e.nativeEvent.offsetX - imageCanvas.current.x.baseVal.value) *
      (1 / imageZoomOut);
    const offsetY =
      (e.nativeEvent.offsetY - imageCanvas.current.y.baseVal.value) *
      (1 / imageZoomOut);

    cPoint.current[cNum][0] = offsetX;
    cPoint.current[cNum][1] = offsetY;

    const newPoint = _.cloneDeep(cPoint.current);
    workDispatch({
      type: 'ADD_OBJECT',
      newPoint,
      nextId,
    });

    cPointState.current = 0;
  } else {
    const cPointElement = cPointRef.current[cNum];

    if (imageCanvas.current == null) {
      return;
    }
    const offsetX =
      (e.nativeEvent.offsetX - imageCanvas.current.x.baseVal.value) *
      (1 / imageZoomOut);
    const offsetY =
      (e.nativeEvent.offsetY - imageCanvas.current.y.baseVal.value) *
      (1 / imageZoomOut);

    cPoint.current[cNum][0] = offsetX;
    cPoint.current[cNum][1] = offsetY;

    if (cPointElement == null) {
      return;
    }
    cPointElement.setAttribute('cx', offsetX.toString());
    cPointElement.setAttribute('cy', offsetY.toString());
    cPointElement.setAttribute('r', '3');

    cPointState.current += 1;
  }
};
