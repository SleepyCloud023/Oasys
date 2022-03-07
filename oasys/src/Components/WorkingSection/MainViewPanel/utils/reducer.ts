import { ACTION, CanvasState, ImgDragEvent } from '../types/canvasStore';

const zoomSensitivityB = 0.2;
const zoomSensitivityC = 0.04;

function reducer(state: CanvasState, action: ACTION): CanvasState {
  switch (action.type) {
    case 'CANVAS_IMAGEZOOM':
      const quotient = Math.round(state.imageZoomOut / zoomSensitivityB);

      if (action.flag == 'in' && state.imageZoomOut < 2) {
        const changedZoomOut = parseFloat(
          ((quotient + 1) * zoomSensitivityB).toFixed(2),
        );
        return { ...state, imageZoomOut: changedZoomOut };
      } else if (action.flag == 'out' && state.imageZoomOut > 0.4) {
        const changeFlag =
          (state.imageZoomOut * 100) % (zoomSensitivityB * 100) == 0 ? 1 : 0;
        const changedZoomOut = parseFloat(
          ((quotient - changeFlag) * zoomSensitivityB).toFixed(2),
        );
        return { ...state, imageZoomOut: changedZoomOut };
      } else {
        return { ...state };
      }

    case 'CANVAS_IMAGEZOOMWHEEL':
      if (action.flag == 'in' && state.imageZoomOut < 2) {
        const changedZoomOut = parseFloat(
          (state.imageZoomOut + zoomSensitivityC).toFixed(2),
        );
        return { ...state, imageZoomOut: changedZoomOut };
      } else if (action.flag == 'out' && state.imageZoomOut > 0.4) {
        const changedZoomOut = parseFloat(
          (state.imageZoomOut - zoomSensitivityC).toFixed(2),
        );
        return { ...state, imageZoomOut: changedZoomOut };
      } else {
        return { ...state };
      }

    case 'CANVAS_IMAGEDRAG':
      if (action.flag == 'down') {
        let newimgDragEvent: ImgDragEvent = {
          originPoint: [0, 0],
          clickPoint: [0, 0],
          on: true,
        };

        newimgDragEvent['originPoint'][0] = state.imagePoint[0];
        newimgDragEvent['originPoint'][1] = state.imagePoint[1];

        newimgDragEvent['clickPoint'][0] = action.offsetX;
        newimgDragEvent['clickPoint'][1] = action.offsetY;
        newimgDragEvent['on'] = true;

        return { ...state, imgDragEvent: newimgDragEvent };
      } else if (action.flag == 'move') {
        const newX =
          state.imgDragEvent['originPoint'][0] +
          (action.offsetX - state.imgDragEvent['clickPoint'][0]);
        const newY =
          state.imgDragEvent['originPoint'][1] +
          (action.offsetY - state.imgDragEvent['clickPoint'][1]);

        return { ...state, imagePoint: [newX, newY] };
      } else if (action.flag == 'up') {
        return { ...state, imgDragEvent: { ...state.imgDragEvent, on: false } };
      }

    default:
      throw new Error('undefined action type: MainViewPanel/utils/reducer.ts');
  }
}

export default reducer;
