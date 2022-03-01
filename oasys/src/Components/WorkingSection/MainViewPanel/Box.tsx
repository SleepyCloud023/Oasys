import React from 'react';

type PropsBox = {
  points: string;
  color: string;
};

function Box({ points, color }: PropsBox) {
  return (
    <polygon
      points={points}
      stroke={color}
      fill={color}
      style={{ opacity: 0.5 }}
      strokeWidth="2"
    ></polygon>
  );
}

export default Box;
