import { ACTION, CanvasState } from './types/canvasStore';

interface MainViewHandlerInterface {
  onZoomClick: (type: 'in' | 'out') => void;
  onContextMenu: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseDown: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onMouseMove: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onMouseUp: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onWheel: (e: React.WheelEvent<SVGSVGElement>) => void;
}

class MainViewHandler implements MainViewHandlerInterface {
  private dispatch: React.Dispatch<ACTION>;
  private state: CanvasState;

  constructor(state: CanvasState, dispatch: React.Dispatch<ACTION>) {
    this.state = state;
    this.dispatch = dispatch;
  }

  onZoomClick = (type: 'in' | 'out') => {
    this.dispatch({
      type: 'CANVAS_IMAGEZOOM',
      flag: type,
    });
  };

  onContextMenu = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
  };

  onMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.nativeEvent.which === 3) {
      this.dispatch({
        type: 'CANVAS_IMAGEDRAG',
        flag: 'down',
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
      });
    }
  };

  onMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.nativeEvent.which === 3 && this.state.imgDragEvent['on']) {
      this.dispatch({
        type: 'CANVAS_IMAGEDRAG',
        flag: 'move',
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
      });
    }
  };

  onMouseUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.nativeEvent.which === 3) {
      this.dispatch({
        type: 'CANVAS_IMAGEDRAG',
        flag: 'up',
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
      });
    }
  };

  onWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    this.dispatch({
      type: 'CANVAS_IMAGEZOOMWHEEL',
      flag: e.deltaY < 0 ? 'in' : 'out',
    });
  };
}

export default MainViewHandler;
