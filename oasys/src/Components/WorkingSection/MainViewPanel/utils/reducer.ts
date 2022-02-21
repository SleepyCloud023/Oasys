import { ACTION, CanvasState, ImgDragEvent } from '../types/canvasStore';

function reducer(state: CanvasState, action: ACTION): CanvasState {
  switch (action.type) {
    case 'CANVAS_IMAGEZOOM':
      if (action.flag == 'in' && state.imageZoomOut <= 1.6) {
        const changedZoomOut = parseFloat(
          (state.imageZoomOut + 0.2).toFixed(2),
        );
        return { ...state, imageZoomOut: changedZoomOut };
      } else if (action.flag == 'out' && state.imageZoomOut >= 0.4) {
        const changedZoomOut = parseFloat(
          (state.imageZoomOut - 0.2).toFixed(2),
        );
        return { ...state, imageZoomOut: changedZoomOut };
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
