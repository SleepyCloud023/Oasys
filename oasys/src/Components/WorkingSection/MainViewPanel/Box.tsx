import {useContext} from 'react';
import { WorkStore } from '../WorkingSection';

type PropsBox = {
  index: number;
  points: string;
  color: string;
  boxesRef : React.MutableRefObject<(SVGPolygonElement|null)[]>
};

function Box({ index, points, color, boxesRef }: PropsBox) {
  const notNullStore = useContext(WorkStore);
  if (notNullStore === null) return null;
  const [workState, workDispatch] = notNullStore;

  const onClick = () => {
    workDispatch({
      type: 'UPDATE_SELECTED',
      newSelected: new Set<number>([index])
    });
  }

  return (
    <polygon
      points={points}
      stroke={color}
      fill={color}
      style={{ opacity: 0.5 }}
      strokeWidth="2"
      onClick={onClick}
      ref={el => boxesRef.current[index] = el}
    ></polygon>
  );
}

export default Box;
