import React from 'react';

type PropsBox = {
  points: string;
};

function Box({ points }: PropsBox) {
  return (
    <polygon
      points={points}
      stroke="green"
      fill="green"
      style={{ opacity: 0.5 }}
      strokeWidth="2"
    ></polygon>
  );
}

export default Box;
